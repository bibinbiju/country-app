import React, { useEffect, useState } from "react";

import CustomEventService from "../../utils/customEventService";
import "./modalRoot.scss";

export const ModalService = {
  open: (component, modalProps = { header: "Hello Modal Title" }) => {
    CustomEventService.dispatch("modal-open", {
      component,
      config: { ...modalProps },
    });
  },
  close: (id) => {
    CustomEventService.dispatch("modal-close", id);
  },
};

export default function ModalRoot() {
  const [modalList, setModalList] = useState([]);

  const closeModal = (id) => {
    setModalList((prev) => {
      if (id) prev = prev.filter((i) => i.id !== id);
      else prev.pop();
      return [...prev];
    });
  };

  useEffect(() => {
    const openModal = (e) => {
      setModalList((prev) => [...prev, e.detail]);
    };
    CustomEventService.on("modal-open", openModal);
    CustomEventService.on("modal-close", (e) =>
      closeModal(e?.detail?.data?.id)
    );
    return () => {
      CustomEventService.off("modal-open", openModal);
      CustomEventService.off("modal-close", (e) =>
        closeModal(e?.detail?.data?.id)
      );
    };
  }, []);
  return (
    Array.isArray(modalList) &&
    modalList.length > 0 &&
    modalList.map((modalData) => {
      const { header, className, ...restProps } = modalData?.data?.config;
      return (
        <div key={modalData?.id} {...restProps} className="modal-window">
          <div className={`modal-content ${className || ""}`}>
            <div>
              <i
                onClick={() => closeModal(modalData?.id)}
                className="fa-solid fa-xmark close"
              />
              <div className="header">{header && <h3>{header}</h3>}</div>
            </div>

            <div className="content">
              {typeof modalData?.data?.component === "function"
                ? modalData?.data?.component?.({
                    close: () => closeModal(modalData?.id),
                  })
                : modalData?.data?.component}
            </div>
          </div>
        </div>
      );
    })
  );
}
