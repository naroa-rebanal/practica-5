export function buildNotificationView(message) {
  return `
  <button class="notification-close">x</button>
    <p>${message}</p>
  `;
}
