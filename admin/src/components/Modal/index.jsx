import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
  open,
  setOpen,
  title,
  content,
  description,
  children,
  handleDate,
  onClick,
  sx,
  dividers,
}) => {
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleDate && handleDate();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={sx}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers={dividers} >
          <DialogContentText id="alert-dialog-slide-description" sx={{paddingTop : "10px"}}>
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions sx={{paddingBottom : "13px",paddingRight : "13px"}}>
          <Button onClick={handleClose} variant={"outlined"}>
            Cancel
          </Button>
          {onClick && (
            <Button onClick={onClick} variant="contained">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
