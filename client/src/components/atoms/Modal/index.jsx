import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./Modal.module.scss";

const BasicModal = (props) => {
  const { title, description, openModal, handleCloseModal } =
    props;

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.Modal}
      >
        <Box className={styles.Box}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            className={styles.description}
          >
            {description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
