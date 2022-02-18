import { buildNotificationView } from "./NotificationView.js";
import { pubSub } from "../pubSub.js";

export class NotificationController {
  constructor(notificationElement) {
    this.notificationElement = notificationElement;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    pubSub.subscribe(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, (message) => {
      this.show(message);
    });
  }

  show(message) {
    const notificationTemplate = buildNotificationView(message);

    this.notificationElement.innerHTML = notificationTemplate;

    const closeButtonelement = this.notificationElement.querySelector("button");

    closeButtonelement.addEventListener("click", (event) => {
      this.notificationElement.innerHTML = "";
    });
  }
}
