import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import { DataGrid } from "./DataGrid";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import classes from "./App.module.scss";
const UserInviteBG = require("../../../ExternalRef/IMG/NewUserBG.png");
export interface IApp {}
// Styles
const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// Styles
export const App: React.FunctionComponent<IApp> = (props: IApp) => {
  const styles = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const body = (
    <div>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      {/* <SimpleModal /> */}
    </div>
  );
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        {/* Illus Section */}
        <img src={`${UserInviteBG}`} />
        {/* Illus Section */}
        {/* App Section */}
        <div className={classes.AppSection}>
          <div className={classes.headerSection}>
            <Typography variant="h5" color="primary">
              Invite User
            </Typography>
            <div className={classes.headerBtn}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                New
              </Button>
            </div>
          </div>
          <DataGrid />
        </div>
        {/* App Section */}
      </div>
      {/* Modal Section */}
      {open && (
        <Modal open={open} onClose={handleClose} className={styles.modal}>
          <Fade in={open}>
            <div className={styles.paper}>
              <div className={classes.modalHeader}>
                {" "}
                <Typography variant="h6" color="primary">
                  New User
                </Typography>
                <ClearIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <TextField
                size="small"
                className={classes.modalTextbox}
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
              />
              <div className={classes.EmailEntries}>
                <TextField
                  size="small"
                  className={classes.modalTextbox}
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                />
                <AddIcon
                  style={{
                    cursor: "pointer",
                    fontSize: 32,
                    color: theme.palette.success.main,
                  }}
                />
                <ClearIcon
                  style={{
                    cursor: "pointer",
                    fontSize: 32,
                    color: theme.palette.error.main,
                  }}
                />
              </div>
              <div className={classes.btnSubmit}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
      {/* Modal Section */}
    </ThemeProvider>
  );
};
