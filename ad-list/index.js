import { AdListController } from "./AdListController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";


document.addEventListener("DOMContentLoaded", async () => {
  const adListElement = document.querySelector(".anuncios-listing");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );
  
  const adListController = new AdListController(adListElement);
  await adListController.showAds();

});

