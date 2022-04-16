import { registerService } from "../register/RegisterService.js";
import AdListService from "../ad-list/AdListService.js";

  class NewAdService {
    constructor() {}
  
    async createAd(adTitle, adPrice, adExtract, adType, adImage) {

    const url = `http://localhost:8000/api/ads/`;


    //Chequeamos el id del ultimo anuncio para generar el id dinamicamente
    const ads =  await AdListService.getAds();
        const lastId = ads[ads.length - 1].id;
        const adId = parseInt(lastId) + 1;

      const body = {
    "image": adImage,
      "title": adTitle,
    "price": adPrice,

    "extract": adExtract,
      "type": adType,
      "id": adId
      };

  

      let response;


      try {
        response = await fetch(url , {
          method: "POST",
          body:JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + registerService.getLoggedUser(),
          },
        });
      } catch (error) {
        throw new Error("No se ha podido crear el anuncio");
      }


    if (!response.ok) {
      throw new Error(data.message);
    }

    const adUrl = `http://localhost:8080/singleAd.html?id=${adId}`;
     window.location.href = adUrl;

    }
  }
  
export const newAdService = new NewAdService();
