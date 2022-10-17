import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Confetti from "react-confetti";
import { getWindowDimensions } from "../../services/windowDimensions";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SucessAlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.enable?props.enable:false);
  const dimensionsPage = getWindowDimensions()
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
    if (props.hasOwnProperty("action"))
      props.action(props.actionParams)
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      {open ? <Confetti width={dimensionsPage.width} height={dimensionsPage.height} /> : <></>}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <Confetti  width={dimensionsPage.width} height={dimensionsPage.height} />
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Obrigado</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
