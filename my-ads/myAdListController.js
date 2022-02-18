import myAdListService from "./myAdListService.js";
import { pubSub } from "../shared/pubSub.js";
import {
  buildAdView,
  buildAdListSpinnerView,
  buildNotFoundAdsView,
} from "../ad-list/AdListView.js";



export class MyAdListController {
  AdListElement = null;

  constructor(AdListElement, notificationController) {
    this.AdListElement = AdListElement;
    this.notificationController = notificationController;
  }

  async showAds() {
    let ads;
    const spinnerTemplate = buildAdListSpinnerView();

    this.AdListElement.innerHTML = spinnerTemplate;

    try {
      ads = await myAdListService.getAds();

      if (ads.length === 0) {
        this.AdListElement.innerHTML = buildNotFoundAdsView();
      }

      for (const ad of ads) {

        const adArticleElement = document.createElement("article");
        // adArticleElement.classList.add("anuncio-item");
        const adTemplate = buildAdView(ad);

        adArticleElement.innerHTML = adTemplate;

        this.AdListElement.appendChild(adArticleElement);

      }

    } catch (error) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Se ha producido un error obteniendo tus anuncios"
      );
    } finally {
      const loader = this.AdListElement.querySelector(".loader");
      loader.remove();
    }
  }
}

