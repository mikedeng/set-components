import { message } from "antd";

export const showMessage = msg => {
  if (!msg) {
    return false;
  }
  message.destroy();
  message.config({ top: "50%" });
  message.info(msg);
  return true;
};

export const showError = msg => {
  if (!msg) {
    return false;
  }
  
  message.destroy();
  message.config({ top: "50%" });
  message.error(msg);
  return true;
};