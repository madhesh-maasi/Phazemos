import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

export interface ICustomAlert {
  open: boolean;
  severity: string;
  message: string;
  handleClose: any;
}

export const CustomAlert: React.FunctionComponent<ICustomAlert> = (
  props: ICustomAlert
) => {
  function Alert(customprops) {
    return <MuiAlert elevation={6} variant="filled" {...customprops} />;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Snackbar
        open={props.open}
        autoHideDuration={2000}
        onClose={props.handleClose}
      >
        <Alert onClose={props.handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
};
