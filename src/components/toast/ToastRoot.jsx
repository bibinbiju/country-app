import { memo, useEffect, useState } from "react";
import CustomEventService from "../../utils/customEventService";
import "./toastRoot.scss";
import { createPortal } from "react-dom";
export const Toast = {
  error: (message) =>
    CustomEventService.dispatch("toast-open", { message, severity: "error" }),
  warning: (message) =>
    CustomEventService.dispatch("toast-open", { message, severity: "warning" }),
  info: (message) =>
    CustomEventService.dispatch("toast-open", { message, severity: "info" }),
  success: (message) =>
    CustomEventService.dispatch("toast-open", { message, severity: "success" }),
};
function ToastRoot() {
  const [toastList, setToastList] = useState([]);

  const closeToast = (id) => {
    setToastList((prev) => {
      if (id) prev = prev.filter((i) => i.id !== id);
      else prev.pop();
      return [...prev];
    });
  };

  useEffect(() => {
    const openToast = (e) => {
      setToastList((prev) => [...prev, e.detail]);
    };
    CustomEventService.on("toast-open", openToast);
    CustomEventService.on("toast-close", (e) =>
      closeToast(e?.detail?.data?.id)
    );
    return () => {
      CustomEventService.off("toast-open", openToast);
      CustomEventService.off("toast-close", (e) =>
        closeToast(e?.detail?.data?.id)
      );
    };
  }, []);

  return (
    Array.isArray(toastList) &&
    toastList.length > 0 &&
    createPortal(
      <div className="toast-window-wrapper">
        {toastList.map((toastData) => {
          console.log(toastData.id);
          const { message, severity, ...restProps } = toastData?.data;
          return (
            <MemoizedToastMessage
              message={message}
              severity={severity}
              key={toastData.id}
              onClose={() => closeToast(toastData?.id)}
              {...restProps}
            />
          );
        })}
      </div>,
      document.body,
      "toast-notifier"
    )
  );
}
export default ToastRoot;
function ToastMessage({ message, severity, onClose = () => {}, ...props }) {
  console.log("invoking", message);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [onClose]);
  return (
    <div {...props} className="toast-container">
      {messageIcon(severity)}
      <div>{message}</div>
      <i onClick={onClose} className="fa-solid fa-xmark close close-icon" />
    </div>
  );
}
const MemoizedToastMessage = memo(ToastMessage, () => true);
const messageIcon = (messageType) => {
  switch (messageType) {
    case "error":
      return <i class="fa-solid fa-circle-exclamation" />;
    case "warning":
      return <i class="fa-solid fa-triangle-exclamation" />;
    case "info":
      return <i class="fa-solid fa-circle-info" />;
    case "succes":
      return <i class="fa-solid fa-circle-check" />;
    default:
      return <i class="fa-solid fa-circle-info" />;
  }
};
