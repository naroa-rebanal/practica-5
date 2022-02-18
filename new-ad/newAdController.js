import { pubSub } from "../shared/pubSub.js";
import { newAdService } from "./newAdService.js";

export class NewAdController {
  constructor(formElement) {
    this.formElement = formElement;
    this.subscribeToEvents();
    }


  subscribeToEvents() {
    this.onAnyInputChanged();
    this.onSubmitForm();
  }

  onAnyInputChanged() {
    const requiredElements = Array.from(
      this.formElement.querySelectorAll("form *:required")
    );




    requiredElements.forEach((requiredElement) => {
      requiredElement.addEventListener("input", () => {
        this.checkIfAllInputsAreFilled(requiredElements);
      });
    });
  }


  checkIfAllInputsAreFilled(requiredElements) {
    const areAllInputsFilled = requiredElements.every(
      (requiredElement) => requiredElement.value
    );

    
    if (areAllInputsFilled) {
      this.formElement.querySelector("button").removeAttribute("disabled");
    } else {
      this.formElement.querySelector("button").setAttribute("disabled", "");
    }
  }



  onSubmitForm() {
      console.log('here');
    this.formElement.addEventListener("submit", (event) => {

      event.preventDefault();

      const formData = new FormData(this.formElement);

      const adPrice = formData.get("priceInput");
      const adExtract = formData.get("extractInput");
      const adType = formData.get("typeInput");
      const adImage = formData.get("imageInput");
      const ownerId = formData.get("1");
      const adTitle = formData.get("titleInput");
   
      this.createAd(adTitle, adPrice, adExtract, adType, adImage);
    });
  }





  async createAd(adTitle, adPrice, adExtract, adType, adImage) {
    try {

      await newAdService.createAd(adTitle, adPrice, adExtract, adType, adImage);
      //podria molar ir a la pagina donde se muestra
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }


}

/**
 * El titulo usuario es obligatorio
 * El precio usuario es obligatorio
 * La descripcion es obligatoris
 * Tienes que seleccionar tipo de anuncio

 * El boton debe habilitarse cuando los campos obligatorios estén rellenos
 * submit debe crear un usuario con esos datos
 */
