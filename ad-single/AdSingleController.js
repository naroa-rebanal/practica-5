import { pubSub } from "../shared/pubSub.js";
import { registerService } from "../register/RegisterService.js";
import AdListService from "../ad-list/AdListService.js";
import { buildAdSingleView } from "./AdSingleView.js";
import { decodeToken } from "../utils/decodeToken.js";

  
  export class AdSingleController {
    constructor(adSingleElement) {
      this.adSingleElement = adSingleElement;
      this.ad = null;
    }
  
    async showAd(adId) {
      if (!adId) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "El id del anuncio no es valido"
        );
  
        return;
      }
  
      try {
        this.ad = await AdListService.getAd(adId);

        const adTemplate = buildAdSingleView(this.ad);
        this.adSingleElement.innerHTML = adTemplate;
  
        this.handleDeleteButton();
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      }
    }
  
    handleDeleteButton() {
      const loggedUserToken = registerService.getLoggedUser();

      if (loggedUserToken) {
        const userInfo = decodeToken(loggedUserToken);
        const isOwner = this.isAdOwner(userInfo.id);

        if (isOwner) {
          this.drawDeleteButton();

        }
      }
    }
  
    isAdOwner(userId) {
      return userId === this.ad.userId;
    }
  
    drawDeleteButton() {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = "Borrar anuncio";
  
      this.adSingleElement.appendChild(buttonElement);
  
      buttonElement.addEventListener("click", () => {
        this.deleteAd();
      });
    }
  
    async deleteAd() {
      const shouldDelete = window.confirm("¿Estás seguro de que quieres borrar el anuncio?");
  
      if (shouldDelete) {
        try {
          await AdListService.deleteAd(this.ad.id);
          alert('Anuncio borrado con exito');
          window.location.href = "/";
        } catch (error) {
          pubSub.publish(
            pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
            "error borrando el anuncio"
          );        }
      }
    }
  }
  