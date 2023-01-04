import * as React from "react";
import { useEffect, useState } from "react";
import classes from "./Geography.module.scss";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import CommonService from "../services/CommonService";
import ClearIcon from "@material-ui/icons/Clear";

import { CustomAlert } from "./CustomAlert";

export interface IGeography {
  CompanyName: string;
  CompanyID: string;
  CompanyCode: string;
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
  },
});
export const Geography: React.FunctionComponent<IGeography> = (
  props: IGeography
) => {

  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  var _commonService: any = {};
  const _geography: string = "Geographic";

  const [geographyDetails, setGeographyDetails] = useState([]);

  const [deleteGeographyDetails, setDeleteGeographyDetails] = useState([]);

  function init() {
    let customProperty = {
      listName: _geography,
      filter: "CompanyIDId eq '" + props.CompanyID + "' and IsDeleted eq '0'",
    };
    _commonService.getList(customProperty, (res: any) => {
      setGeographyDetails([]);
      setDeleteGeographyDetails([]);
      if (res && res.length > 0) {
        loadGeographyDetails(res);
      } else {
        addGeographyDetails();
      }
    });
  }

  function loadGeographyDetails(companyData: any[]) {
    let geographyDetailsModel = [];
    for (let index = 0; index < companyData.length; index++) {
      geographyDetailsModel.push({
        CompanyIDId: props.CompanyID,
        Title: companyData[index].Title,
        CountryofResidence: companyData[index].CountryofResidence,
        Year: companyData[index].Year,
        CountriesWorked: companyData[index].CountriesWorked,
        IsDeleted: false,
        ID: companyData[index].ID,
      });
    }
    setGeographyDetails([...geographyDetailsModel]);
  }

  function addGeographyDetails() {
    let geographyDetailsModel = geographyDetails;
    geographyDetailsModel.push({
      CompanyIDId: props.CompanyID,
      Title: "",
      CountryofResidence: "",
      Year: "",
      CountriesWorked: "",
      IsDeleted: false,
      ID: 0,
    });
    setGeographyDetails([...geographyDetailsModel]);
  }

  function removeGeographyDetails(index: number) {
    let geographyDetailsModel = geographyDetails;
    let delData = deleteGeographyDetails;
    if (geographyDetails[index].ID != 0) {
      geographyDetails[index].IsDeleted = true;
      delData.push(geographyDetails[index]);
    }
    geographyDetailsModel.splice(index, 1);
    setGeographyDetails([...geographyDetailsModel]);
    setDeleteGeographyDetails([...deleteGeographyDetails]);
  }

  function submitData() {
    let formKeys = Object.keys(geographyDetails[0]);
    let isValidForm = true;
    for (let i = 0; i < geographyDetails.length; i++) {
      for (let index = 0; index < formKeys.length; index++) {
        if (
          formKeys[index] != "ID" &&
          formKeys[index] != "IsDeleted" &&
          !geographyDetails[i][formKeys[index]]
        ) {
          console.log(formKeys[index] + " is required");
          isValidForm = false;
          break;
        }
      }
    }
    if (!isValidForm) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Invalid form",
      });
      return;
    }

    _commonService = new CommonService();

    let allData = geographyDetails.slice();
    let addData = allData.filter((c) => c.ID == 0);
    let editData = allData.filter((c) => c.ID != 0);

    updateGeographyDetails();
    if (addData.length) {
      _commonService.bulkInsert(
        { listName: _geography },
        addData,
        (bulkres: any) => {
          if (editData.length == 0) {
            init();
            setAlert({
              open: true,
              severity: "success",
              message: "Inserted successfully",
            });
          }
        }
      );
    }
  }

  function updateGeographyDetails() {
    let allData = geographyDetails.slice();
    let editData = allData.filter((c) => c.ID != 0);
    editData = editData.concat(deleteGeographyDetails);
    if (editData.length > 0) {
      _commonService.bulkUpdate(
        { listName: _geography },
        editData,
        (bulkres: any) => {
          init();
        }
      );
      setAlert({
        open: true,
        severity: "success",
        message: "Updated successfully",
      });
    }
  }

  function inputChangeHandler(event: any, index: number): any {
    let geographyDetailsModel = geographyDetails;
    geographyDetailsModel[index][event.target.name] = event.target.value;
    setGeographyDetails([...geographyDetailsModel]);
  }

  useEffect((): any => {
    _commonService = new CommonService();
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <h3 className={classes.headerTitle}>Company Profile</h3>
      <div className={classes.companyDetails}>
        <TextField
          style={{ width: "40%", marginRight: 30 }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          aria-readonly={true}
          name="CompanyName"
          value={props.CompanyName}
        />
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          style={{ width: 100 }}
          aria-readonly={true}
          value={props.CompanyCode}
        />
      </div>
      <div>
        <h4 className={classes.headerTitle}>
          Number and Type of Resource by Geography
        </h4>

        {geographyDetails.map((details: any, index: number) => {
          return (
            <div className={classes.NumberTypeSection}>
              <TextField
                className={classes.NTItem}
                id="outlined-basic"
                label="Employee Title"
                variant="outlined"
                name="Title"
                value={details.Title}
                onChange={(e) => inputChangeHandler(e, index)}
              />
              <TextField
                className={classes.NTItem}
                id="outlined-basic"
                label="Country of Residence"
                variant="outlined"
                name="CountryofResidence"
                value={details.CountryofResidence}
                onChange={(e) => inputChangeHandler(e, index)}
              />
              <TextField
                className={classes.NTItem}
                id="outlined-basic"
                label="#"
                variant="outlined"
                name="Year"
                value={details.Year}
                onChange={(e) => inputChangeHandler(e, index)}
              />
              <TextField
                className={classes.NTItem}
                id="outlined-basic"
                label="Countries Worked"
                variant="outlined"
                name="CountriesWorked"
                value={details.CountriesWorked}
                onChange={(e) => inputChangeHandler(e, index)}
              />

              {geographyDetails.length == index + 1 && (
                <AddCircleOutlineIcon
                  onClick={(e) => addGeographyDetails()}
                  style={{ fontSize: 40, color: theme.palette.primary.main }}
                />
              )}

              {geographyDetails.length > 1 && (
                <ClearIcon
                  style={{
                    cursor: "pointer",
                    fontSize: 32,
                    color: theme.palette.error.main,
                  }}
                  onClick={(e) => removeGeographyDetails(index)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary" onClick={submitData}>
          Submit
        </Button>
      </div>
      
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
