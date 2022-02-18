import { registerService } from "../register/RegisterService.js";
import { decodeToken } from "../utils/decodeToken.js";


export default {
  async getAds() {
    const url = "http://localhost:8000/api/ads";
    let response;
    let ads;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No se ha podido ir a por los anuncios");
    }

    if (!response.ok) {
      throw new Error("Anuncios no encontrados");
    }

    try {
      ads = await response.json();
      const user = registerService.getLoggedUser();
      const userInfo = decodeToken(user);
      const userId = userInfo.userId;
      
      ads = ads.filter(function (ad){
        return ad.userId == userId;
      });
      

    } catch (error) {
      throw new Error("No se ha podido transformar la respuesta a json");
    }

    const transformedAds = this.transformAds(ads);

    return transformedAds;
  },



  transformAds(ads) {
    return ads.map((ad) => {
      const transformedAd = {
        id: ad.id || 0,
        image:ad.image || "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg",
        title: ad.title || ad.name, 
        price: ad.price || 0,
        extract: ad.extract || ad.body,
        type: ad.type || 0,
        idUser: ad.idUser || ad.userId,

        
      };

      return transformedAd;
    });
  }


};
