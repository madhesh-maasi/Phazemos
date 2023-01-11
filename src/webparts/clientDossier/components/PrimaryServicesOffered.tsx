import * as React from "react";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Button } from "@material-ui/core";
import classes from "./ProjectWork.module.scss";
import AddIcon from "@material-ui/icons/Add";

import CommonService from "../services/CommonService";
import ClearIcon from "@material-ui/icons/Clear";

import { CustomAlert } from "./CustomAlert";

export interface IPrimaryServicesOffered {
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
export const PrimaryServicesOffered: React.FunctionComponent<
  IPrimaryServicesOffered
> = (props: IPrimaryServicesOffered) => {
  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  const [allTicketSizes, setAllTicketSizes] = useState([]);
  const [allPrimaryServicesOffers, setAllPrimaryServicesOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({});

  var _commonService: CommonService;

  const _projectWorkTicketDetails: string = "Project Work Ticket Details";
  const _primaryServicesOfferedMaster: string =
    "Primary Services Offered Master";

  function loadCompanyProjectServicesOfferedMaster(editData: any) {
    let customProperty = {
      listName: _primaryServicesOfferedMaster,
      properties: "ID,Title,IsActive",
      orderby: "OrderNo",
      orderbyAsc: true,
    };
    _commonService.getList(customProperty, (res: any) => {
      let ticketSizes = [];
      let allOffers = [];
      for (let index = 0; index < res.length; index++) {
        let editMap = editData.projectServicesOfferedMapping.filter(
          (c) => c.PrimaryServicesMasterIDId == res[index].Id
        );
        if (editMap.length || res[index].IsActive) {
          let data = {
            ID: 0,
            CompanyIDId: props.CompanyID,
            PrimaryServicesMasterIDId: res[index].Id,
            Title: res[index].Title,
            Year: "",
            Size: "",
          };
          if (editMap.length) {
            data.ID = editMap[0].ID;
            data.Year = editMap[0].Year;
            data.Size = editMap[0].Size;
            ticketSizes.push(data);
          } else {
            allOffers.push(data);
          }
        }
      }
      setAllTicketSizes([...ticketSizes]);
      setAllPrimaryServicesOffers([...allOffers]);
    });
  }

  function loadCompanyProjectServicesOfferedMapping() {
    let customProperty = {
      listName: _projectWorkTicketDetails,
      filter: "CompanyIDId eq '" + props.CompanyID + "'  and IsDeleted eq '0'",
    };
    _commonService.getList(customProperty, (res: any) => {
      if (res && res.length > 0) {
        loadCompanyProjectServicesOfferedMaster({
          projectServicesOfferedMapping: res,
        });
      } else {
        loadCompanyProjectServicesOfferedMaster({
          projectServicesOfferedMapping: [],
        });
      }
    });
  }

  function init() {
    _commonService = new CommonService();

    loadCompanyProjectServicesOfferedMapping();
  }

  function inputChangeHandler(event: any, index: number): any {
    let tickets = allTicketSizes;
    tickets[index][event.target.name] = event.target.value;
    setAllTicketSizes([...tickets]);
  }

  function submitData() {
    let isValidForm = true;
    if (!isValidForm) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Invalid form",
      });
      return;
    }

    _commonService = new CommonService();
    insertOrUpdateProjectWorkMapping();
    setAlert({
      open: true,
      severity: "success",
      message: "Inserted successfully",
    });
  }

  function insertOrUpdateProjectWorkMapping() {
    let locTicketSizes = allTicketSizes.slice();
    let addData = locTicketSizes.filter((c) => c.ID == 0);
    let editData = locTicketSizes.filter((c) => c.ID != 0);
    addData.forEach((data) => {
      data.CompanyIDId = props.CompanyID;
      delete data.ID;
      delete data.Title;
    });

    editData.forEach((data) => {
      delete data.Title;
    });

    if (addData.length) {
      _commonService.bulkInsert(
        { listName: _projectWorkTicketDetails },
        addData,
        (res) => {
          init();
        }
      );
    }

    if (editData.length) {
      _commonService.bulkUpdate(
        { listName: _projectWorkTicketDetails },
        editData,
        (res) => {
          init();
        }
      );
    }
  }

  const selHandleChange = (event) => {
    setNewOffer(event.target.value);
  };

  const addNewOffer = (event) => {
    let allTickets = allTicketSizes;
    let exists = allTickets.filter((c) => c.ID == newOffer["ID"]);
    if (exists.length == 0) {
      allTickets.push(newOffer);
      setAllTicketSizes([...allTickets]);
    } else {
      setAlert({
        open: true,
        severity: "warning",
        message: "Already added",
      });
    }
  };

  useEffect((): any => {
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <h3 className={classes.headerTitle}>Company Profile</h3>
      <div className={classes.companyDetails}>
        <TextField
          style={{ width: "40%", marginRight: 30 }}
          id="outlined-basic"
          label="Company Name"
          size="small"
          variant="outlined"
          aria-readonly={true}
          name="CompanyName"
          value={props.CompanyName}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="ID"
          variant="outlined"
          style={{ width: 100 }}
          aria-readonly={true}
          value={props.CompanyCode}
        />
      </div>
      <h4 className={classes.headerTitle}>
        Fill in the number of projects in the last 3 years and select average
        ticket size range per project
      </h4>
      <div>
        <FormControl style={{ width: "250px" }} variant="outlined">
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            onChange={selHandleChange}
          >
            {allPrimaryServicesOffers.map((m) => {
              return <MenuItem value={m}>{m.Title}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addNewOffer}
          >
            New
          </Button>
        </div>
      </div>
      <div className={classes.NoAndSizeSection}>
        {allTicketSizes.map((ticket: any, index: number) => {
          return (
            <div className={classes.NoAndSizeItem}>
              <p>{ticket.Title}</p>
              <div className={classes.InputSection}>
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="#"
                  variant="outlined"
                  className={classes.TextInput}
                  value={ticket.Year}
                  name="Year"
                  onChange={(e) => inputChangeHandler(e, index)}
                />
                <TextField
                  id="outlined-basic"
                  label="Size"
                  size="small"
                  variant="outlined"
                  className={ticket.Size}
                  value={ticket.Size}
                  name="Size"
                  onChange={(e) => inputChangeHandler(e, index)}

                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.bottomBtnSection}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={(e) => submitData()}
        >
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
