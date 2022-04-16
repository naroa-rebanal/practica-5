import { MyAdListController } from "./myAdListController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { registerService } from "../register/RegisterService.js";


document.addEventListener("DOMContentLoaded", async () => {
  const adListElement = document.querySelector(".anuncios-listing");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );
  

  const loggedUserToken = registerService.getLoggedUser();
  if (!loggedUserToken) {
        window.location.href = "/";
  }

  const myAdListController = new MyAdListController(adListElement);
  await myAdListController.showAds();

});

