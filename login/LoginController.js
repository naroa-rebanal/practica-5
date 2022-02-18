import { registerService } from "../register/registerService.js";
import { pubSub } from "../shared/pubSub.js";

export class LoginController {
  constructor(loginFormElement) {
    this.loginFormElement = loginFormElement;

    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitLoginForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.loginFormElement.querySelectorAll("input")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.loginFormElement
            .querySelector("button")
            .removeAttribute("disabled");
        } else {
          this.loginFormElement
            .querySelector("button")
            .setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitLoginForm() {
    this.loginFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.loginFormElement);

      const username = formData.get("user");
      const password = formData.get("password");

      this.loginUser(username, password);
    });
  }

  async loginUser(username, password) {
    try {
      await registerService.loginUser(username, password);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
