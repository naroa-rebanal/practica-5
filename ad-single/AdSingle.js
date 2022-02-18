import { AdSingleController } from "./AdSingleController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const adSingleElement = document.querySelector(".anuncio-single");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const searchParams = new URLSearchParams(window.location.search);

  const adId = searchParams.get("id");

  const adSingleController = new AdSingleController(adSingleElement);
      adSingleController.showAd(adId);
});




   


  