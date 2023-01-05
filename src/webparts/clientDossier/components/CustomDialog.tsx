import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./CompanyProfile.module.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface ICustomDialog {
  open: boolean;
  title: string;
  message: string;
  closeDialog: any;
  disagree: any;
  agree: any;
}

export const CustomDialog: React.FunctionComponent<ICustomDialog> = (
  props: ICustomDialog
) => {
  
  return (
    <Dialog
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.disagree} color="primary">
          No
        </Button>
        <Button onClick={props.agree} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
