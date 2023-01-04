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
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { initial } from "lodash";
const UserInviteBG = require("../../../ExternalRef/IMG/NewUserBG.png");

export interface IApp {}

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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const App: React.FunctionComponent<IApp> = (props: IApp) => {
  const styles = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [selOpen, setSelOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const selHandleChange = (event) => {
    setCurrentMaster(event.target.value);
  };

  const selHandleClose = () => {
    setSelOpen(false);
  };

  const selHandleOpen = () => {
    setSelOpen(true);
  };

  let initialMaster = {
    title: "Disease Area Experience Master",
    listName: "Disease Area Experience Master",
  };
  
  const [currentMaster, setCurrentMaster] = useState(initialMaster.title);

  const [masters, setMasters] = useState([
    initialMaster,
    {
      title: "In House Regulatory Regime Experience Master",
      listName: "In House Regulatory Regime Experience Master",
    },
    {
      title: "Primary Services Offered Master",
      listName: "Primary Services Offered Master",
    },
    {
      title: "Project Work Master",
      listName: "Project Work Master",
    },
    {
      title: "Therapeutic Area Experience Master",
      listName: "Therapeutic Area Experience Master",
    },
  ]);


  function  rerender(){

  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        
        <div className={classes.AppSection}>
          <div className={classes.headerSection}>
            <Typography variant="h5" color="primary">
              Masters
            </Typography>

            <FormControl>
              <InputLabel id="demo-controlled-open-select-label">
                Masters
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={selOpen}
                onClose={selHandleClose}
                onOpen={selHandleOpen}
                value={currentMaster}
                onChange={selHandleChange}
              >

                {masters.map((m) => {
                  return <MenuItem value={m.listName}>{m.title}</MenuItem>;
                })}
              </Select>
            </FormControl>

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
          <DataGrid ListName={currentMaster}/>
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
                  New Entry
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
                label="Title"
                variant="outlined"
              />
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This is a success message!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
