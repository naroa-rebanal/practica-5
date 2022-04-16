import { NewAdController } from "./newAdController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { registerService } from "../register/RegisterService.js";


document.addEventListener("DOMContentLoaded", async () => {

  const formElement = document.querySelector("form");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );
  

  const loggedUserToken = registerService.getLoggedUser();
  if (!loggedUserToken) {
        window.location.href = "/";
  }

  const newAdController = new NewAdController(formElement);

});