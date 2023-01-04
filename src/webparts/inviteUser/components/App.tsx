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

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import CommonService from "../services/CommonService";
import { IInviteUserProps } from "./IInviteUserProps";

import { CustomAlert } from "./CustomAlert";

const UserInviteBG = require("../../../ExternalRef/IMG/NewUserBG.png");

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
export const App: React.FunctionComponent<IInviteUserProps> = (
  props: IInviteUserProps
) => {
  var _commonService: CommonService;

  const _companyRegistration: string = "Company Registration";
  const _userDetails: string = "User Details";

  const _acceptInviteUrl: string =
    "https://douglas-phazemos.azurewebsites.net/Phazemos/Index?id=";

  const [formData, setFormData] = useState({
    companyName: null,
    CompanyProfile: true,
    TherapeuticExpertise: true,
    RegulatoryExpertise: true,
    Geography: true,
    ProjectWork: true,
    Uploads: true,
    users: [""],
  });

  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  function addUser() {
    let data = formData;
    data.users.push("");
    setFormData({ ...data });
  }

  function removeUser(index: number) {
    let data = formData;
    data.users.splice(index, 1);
    setFormData({ ...data });
  }

  function inviteNewUser() {
    _commonService = new CommonService();

    let data = formData;
    var companyData = {
      Title: data.companyName,
      CompanyID: "",
      CompanyProfile: data.CompanyProfile,
      TherapeuticExpertise: data.TherapeuticExpertise,
      RegulatoryExpertise: data.RegulatoryExpertise,
      Geography: data.Geography,
      ProjectWork: data.ProjectWork,
      Uploads: data.Uploads,
    };

    if (!companyData.Title) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Company name is mandatory",
      });
      return;
    }

    for (let index = 0; index < data.users.length; index++) {
      const user = data.users[index];
      if (!_commonService.validateEmail(user)) {
        setAlert({
          open: true,
          severity: "warning",
          message: user + " is not a valid Email ID",
        });
        return;
      }
    }

    let customProperty = {
      listName: _companyRegistration,
      ID: 0,
    };

    _commonService.insertIntoList(
      customProperty,
      companyData,
      (companyres: any) => {
        customProperty.ID = companyres.data.Id;
        companyData.CompanyID = generateCompanyID(companyres.data.Id);
        _commonService.updateList(customProperty, companyData);

        customProperty.listName = _userDetails;

        let users = data.users.slice();
        for (let index = 0; index < users.length; index++) {
          let userData = {
            UserEmailID: users[index],
            CompanyIDId: companyres.data.Id,
          };
          _commonService.insertIntoList(
            customProperty,
            userData,
            (userres: any) => {
              var graphProperty = {
                UserEmailID: users[index],
                InviteRedirectUrl:
                  _acceptInviteUrl +
                  btoa(userres.data.Id + "-" + companyData.Title),
              };

              setRender(!render);

              _commonService.graphCallToInviteUser(
                props,
                graphProperty,
                (graphres: any) => {}
              );
            }
          );
        }
        setAlert({
          open: true,
          severity: "success",
          message: "User invitation sent successfully",
        });
        handleClose();
        init();
      }
    );
  }

  function generateCompanyID(id: number) {
    let strId = id + "";
    let prefix = "COM";
    switch (strId.length) {
      case 1:
        return prefix + "00" + strId;
      case 2:
        return prefix + "0" + strId;
      default:
        return prefix + strId;
    }
  }

  function inputChangeHandler(event: any) {
    let data = formData;
    data[event.target.name] = event.target.value;
    setFormData({ ...data });
  }

  function userChangeHandler(event: any, index: number) {
    let data = formData;
    data.users[index] = event.target.value;
    setFormData({ ...data });
  }

  function init() {
    let data = formData;
    formData.companyName = null;
    formData.users = [""];
    setFormData({ ...data });
  }

  function checkboxChangeHandler(event: any) {
    let data = formData;
    formData[event.target.name] = event.target.checked;
    setFormData({ ...data });
  }

  useEffect((): any => {
    _commonService = new CommonService();
  }, []);

  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [render, setRender] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    let data = formData;
    formData.companyName = null;
    formData.users = [""];
    setFormData({ ...data });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        {/* Illus Section */}
        {/* <img src={`${UserInviteBG}`} /> */}
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
          <DataGrid render={render} />
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
                name="companyName"
                value={formData.companyName}
                onChange={(e) => inputChangeHandler(e)}
              />

              {formData.users.map((user: any, index: number) => {
                return (
                  <div className={classes.EmailEntries}>
                    <TextField
                      size="small"
                      className={classes.modalTextbox}
                      id="outlined-basic"
                      label="Email ID"
                      variant="outlined"
                      name="user"
                      value={user}
                      onChange={(e) => userChangeHandler(e, index)}
                    />
                    {formData.users.length == index + 1 && (
                      <AddIcon
                        style={{
                          cursor: "pointer",
                          fontSize: 32,
                          color: theme.palette.success.main,
                        }}
                        onClick={(e) => addUser()}
                      />
                    )}

                    {formData.users.length > 1 && (
                      <ClearIcon
                        style={{
                          cursor: "pointer",
                          fontSize: 32,
                          color: theme.palette.error.main,
                        }}
                        onClick={(e) => removeUser(index)}
                      />
                    )}
                  </div>
                );
              })}

              <div className={classes.AreaExperience}>
                <p>List of Modules</p>
                <div className={classes.CheckBoxSection}>
                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.CompanyProfile}
                          name="CompanyProfile"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Company Profile"
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.TherapeuticExpertise}
                          name="TherapeuticExpertise"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Expertise - Therapeutic"
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.RegulatoryExpertise}
                          name="RegulatoryExpertise"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Expertise - Regulatory"
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.Geography}
                          name="Geography"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Geography"
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.ProjectWork}
                          name="ProjectWork"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Project Work"
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.Uploads}
                          name="Uploads"
                          color="primary"
                          onChange={(e) => checkboxChangeHandler(e)}
                        />
                      }
                      label="Uploads"
                    />
                  </div>
                </div>
              </div>

              <div className={classes.btnSubmit}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => inviteNewUser()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      )}

      <CustomAlert
        open={cusalert.open}
        message={cusalert.message}
        severity={cusalert.severity}
        handleClose={(e) => {
          setAlert({
            open: false,
            severity: "",
            message: "",
          });
        }}
      ></CustomAlert>
    </ThemeProvider>
  );
};
