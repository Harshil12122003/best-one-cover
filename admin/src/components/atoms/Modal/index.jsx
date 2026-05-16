import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./Modal.module.scss";
import BaseButton from "../Button";

const BasicModal = (props) => {
  const { title, description, openModal, handleCloseModal, handleClick, children,modelData, setModelData } = props;

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.Modal}
      >
        <div className={styles.Box}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            className={styles.title}
          >
            {title}
          </Typography>
          <div className={styles.children}>{children}</div>
          <Typography
            id="modal-modal-description"
            className={styles.description}
          >
            {description}
          </Typography>
          <div className={styles.modalBtn}>
            <BaseButton onClick={handleCloseModal} variant={"outlined"}>
              Cancel
            </BaseButton>
            <BaseButton onClick={handleClick} variant="contained">
              Save
            </BaseButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
