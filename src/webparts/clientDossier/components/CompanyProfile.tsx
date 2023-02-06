import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./CompanyProfile.module.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import CommonService from "../services/CommonService";

import { CustomAlert } from "./CustomAlert";

export interface ICompanyProfile {
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

export const CompanyProfile: React.FunctionComponent<ICompanyProfile> = (
  props: ICompanyProfile
) => {
  var _commonService: CommonService = new CommonService();

  var _primaryMap = "Primary Services Offered Mapping";
  var _companyProfile = "Company Profile";
  var _primaryMaster = "Primary Services Offered Master";
  var _requiredCompanyDetails = ["RFPContact", "InvoicingContact"];
  const _projectWorkTicketDetails: string = "Project Work Ticket Details";

  const [companyProfile, setCompanyProfile] = useState({
    RFPContact: "",
    InvoicingContact: "",
    RFPContactEmail: "",
    InvoicingContactEmail: "",
    WebsiteURL: "",
    LinkedIn: "",
    Facebook: "",
    Twitter: "",
  });
  const [primaryServices, setPrimaryServices] = useState([]);

  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  const [companyMappingEditData, setCompanyMappingEditData] = useState({
    companyProfile: null,
    primaryServiceMapping: [],
  });

  const [readOnly, setReadOnly] = useState(false);

  function loadActivePrimaryServicesOfferedMaster(editData) {
    let customProperty = {
      listName: _primaryMaster,
      properties: "ID,Title,IsActive",
      orderby: "OrderNo",
      orderbyAsc: true,
    };
    _commonService = new CommonService();
    _commonService.getList(customProperty, (res: any[]) => {
      let primaryService: any[] = [];
      for (let index = 0; index < res.length; index++) {
        let editMap = editData.primaryServiceMapping.filter(
          (c) => c.PrimaryServicesMasterIDId == res[index].Id
        );

        if (editMap.length || res[index].IsActive) {
          let data = {
            PrimaryServicesMasterIDId: res[index].Id,
            serviceName: res[index].Title,
            Home: false,
            Sub: false,
            CompanyProfileIDId: 0,
            ID: 0,
          };
          if (editMap.length) {
            data.CompanyProfileIDId = editMap[0].CompanyProfileIDId;
            data.Home = editMap[0].Home;
            data.Sub = editMap[0].Sub;
            data.ID = editMap[0].ID;
          }
          primaryService.push(data);
        }
      }
      setPrimaryServices([...primaryService]);
    });
  }

  function loadCompanyProfile() {
    let customProperty = {
      listName: _companyProfile,
      filter: "CompanyIDId eq '" + props.CompanyID + "'",
    };
    _commonService.getList(customProperty, (res: any) => {
      if (res && res.length > 0) {
        let formData: any = {};
        formData.RFPContact = res[0].RFPContact;
        formData.InvoicingContact = res[0].InvoicingContact;
        formData.RFPContactEmail = res[0].RFPContactEmail;
        formData.InvoicingContactEmail = res[0].InvoicingContactEmail;
        formData.WebsiteURL = res[0].WebsiteURL;
        formData.LinkedIn = res[0].LinkedIn;
        formData.Facebook = res[0].Facebook;
        formData.Twitter = res[0].Twitter;
        setCompanyProfile(formData);
        loadCompanyProfileMapping(res[0]);
      } else {
        setCompanyProfile({
          RFPContact: "",
          InvoicingContact: "",
          RFPContactEmail: "",
          InvoicingContactEmail: "",
          WebsiteURL: "",
          LinkedIn: "",
          Facebook: "",
          Twitter: "",
        });
        setPrimaryServices([]);
        setCompanyMappingEditData({
          companyProfile: null,
          primaryServiceMapping: [],
        });

        loadActivePrimaryServicesOfferedMaster({
          companyProfile: null,
          primaryServiceMapping: [],
        });
      }
    });
  }

  function loadCompanyProfileMapping(res: any) {
    let customProperty = {
      listName: _primaryMap,
      filter: "CompanyProfileIDId eq '" + res.ID + "'",
      expand: "PrimaryServicesMasterID",
      properties: "*,PrimaryServicesMasterID/Title",
    };
    _commonService.getList(customProperty, (mapres: any) => {
      let editData: any = {};
      editData.companyProfile = res;
      editData.primaryServiceMapping = mapres;
      setCompanyMappingEditData({ ...editData });
      loadActivePrimaryServicesOfferedMaster(editData);
    });
  }

  function init() {
    if (localStorage.getItem("_IsReadOnly_")) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
    loadCompanyProfile();
  }

  function inputChangeHandler(event: any) {
    let formData = companyProfile as any;
    formData[event.target.name] = event.target.value;
    setCompanyProfile({ ...formData });
  }

  function checkboxChangeHandler(index: number, event: any) {
    let allPrimaryServices = primaryServices as any[];
    allPrimaryServices[index][event.target.name] = event.target.checked;
    setPrimaryServices([...allPrimaryServices]);
  }

  function submitData() {
    let companyPostData = companyProfile as any;
    let formKeys = _requiredCompanyDetails as [];

    let isValidForm = true;
    for (let index = 0; index < formKeys.length; index++) {
      if (!companyPostData[formKeys[index]]) {
        console.log(formKeys[index] + " is required");
        isValidForm = false;
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

    if (
      companyPostData.RFPContactEmail &&
      !_commonService.validateEmail(companyPostData.RFPContactEmail)
    ) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Invalid RFP Email",
      });
      return;
    }

    if (
      companyPostData.InvoicingContactEmail &&
      !_commonService.validateEmail(companyPostData.InvoicingContactEmail)
    ) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Invalid Invoicing Email",
      });
      return;
    }

    if (!companyMappingEditData.companyProfile) {
      insertCompanyProfile();
    } else {
      updateCompanyProfile();
    }
  }

  function insertCompanyProfile() {
    let companyPostData = companyProfile as any;
    delete companyPostData.ID;
    _commonService = new CommonService();
    companyPostData.CompanyIDId = props.CompanyID;
    _commonService.insertIntoList(
      {
        listName: _companyProfile,
      },
      companyPostData,
      (res: any) => {
        let locPrimaryServices = primaryServices.slice();
        locPrimaryServices.forEach((primaryService: any) => {
          primaryService.CompanyProfileIDId = res.data.Id;
          delete primaryService.serviceName;
          delete primaryService.ID;
        });
        _commonService.bulkInsert(
          { listName: _primaryMap },
          locPrimaryServices,
          (bulkres: any) => {
            init();
            setAlert({
              open: true,
              severity: "success",
              message: "Inserted successfully",
            });
          }
        );
      }
    );
    insertOrUpdateServiceOfferTab();
  }

  function updateCompanyProfile() {
    let companyPostData = companyProfile as any;
    _commonService = new CommonService();
    _commonService.updateList(
      {
        listName: _companyProfile,
        ID: companyMappingEditData.companyProfile.ID,
      },
      companyPostData,
      (res: any) => {
        let locPrimaryServices = primaryServices.slice();
        let addItem = locPrimaryServices.filter(
          (c) => c.CompanyProfileIDId == 0
        );
        addItem.forEach((primaryService: any) => {
          primaryService.CompanyProfileIDId =
            companyMappingEditData.companyProfile.ID;
          delete primaryService.serviceName;
          delete primaryService.ID;
        });
        let editItem = locPrimaryServices.filter(
          (c) => c.CompanyProfileIDId != 0
        );
        editItem.forEach((primaryService: any) => {
          primaryService.CompanyProfileIDId =
            companyMappingEditData.companyProfile.ID;
          delete primaryService.serviceName;
        });

        if (addItem.length) {
          _commonService.bulkInsert(
            { listName: _primaryMap },
            addItem,
            (bulkres: any) => {}
          );
        }
        if (editItem.length) {
          _commonService.bulkUpdate(
            { listName: _primaryMap },
            editItem,
            (bulkres: any) => {}
          );
        }
        init();
        setAlert({
          open: true,
          severity: "success",
          message: "Updated successfully",
        });
      }
    );
    insertOrUpdateServiceOfferTab();
  }

  function insertOrUpdateServiceOfferTab() {
    let customProperty = {
      listName: _projectWorkTicketDetails,
      filter: "CompanyIDId eq '" + props.CompanyID + "'  and IsDeleted eq '0'",
    };
    _commonService.getList(customProperty, (res: any) => {
      let locPrimaryServices = primaryServices.slice();
      let postData = [];

      if (res.length == 0) {
        var newDatas = locPrimaryServices.filter(
          (c) => c.Home == true || c.Sub == true
        );
        if (newDatas.length) {
          //Add new records
          for (let index = 0; index < newDatas.length; index++) {
            postData.push({
              CompanyIDId: props.CompanyID,
              PrimaryServicesMasterIDId:
                newDatas[index].PrimaryServicesMasterIDId,
            });
          }

          _commonService.bulkInsert(
            { listName: _projectWorkTicketDetails },
            postData
          );
        }
      } else {
        //Delete records
        for (let index = 0; index < res.length; index++) {
          let deleteDatas = locPrimaryServices.filter(
            (c) =>
              c.PrimaryServicesMasterIDId ==
                res[index].PrimaryServicesMasterIDId &&
              c.Home == false &&
              c.Sub == false
          );
          if (deleteDatas.length) {
            let delData = res[index];
            delData.IsDeleted = true;
            _commonService.updateList(
              { listName: _projectWorkTicketDetails, ID: res[index].ID },
              delData
            );
          }
        }

        //Add new records
        var selDatas = locPrimaryServices.filter(
          (c) => c.Home == true || c.Sub == true
        );
        for (let j = 0; j < selDatas.length; j++) {
          let exists = res.filter(
            (c) =>
              c.PrimaryServicesMasterIDId ==
              selDatas[j].PrimaryServicesMasterIDId
          );
          if (exists.length == 0) {
            postData.push({
              CompanyIDId: props.CompanyID,
              PrimaryServicesMasterIDId: selDatas[j].PrimaryServicesMasterIDId,
              IsDeleted: false,
            });
          }
        }
        if (postData.length) {
          _commonService.bulkInsert(
            { listName: _projectWorkTicketDetails },
            postData
          );
        }
      }
    });
  }

  useEffect((): any => {
    _commonService = new CommonService();
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <h3 className={classes.headerTitle}>Company Profile</h3> */}
      <div className={`${classes.companyDetails} disableInput`}>
        <TextField
          style={{ width: "38%", marginRight: 32 }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          aria-readonly={true}
          size="small"
          name="CompanyName"
          value={props.CompanyName}
          disabled
        />
        <TextField
          id="outlined-basic"
          label="ID"
          size="small"
          variant="outlined"
          className={classes.idTextField}
          style={{ width: "8%" }}
          aria-readonly={true}
          value={props.CompanyCode}
          disabled
        />
      </div>
      <div className={classes.CompanyContactInfo}>
        <TextField
          required
          className={classes.CompanyContact}
          id="outlined-basic"
          size="small"
          label="RFP Contact"
          variant="outlined"
          name="RFPContact"
          value={companyProfile.RFPContact}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          size="small"
          label="Email"
          variant="outlined"
          name="RFPContactEmail"
          value={companyProfile.RFPContactEmail}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
        <TextField
          required
          className={classes.CompanyContact}
          id="outlined-basic"
          size="small"
          label="Invoicing Contact"
          name="InvoicingContact"
          value={companyProfile.InvoicingContact}
          onChange={(e) => inputChangeHandler(e)}
          variant="outlined"
          disabled={readOnly}
        />
        <TextField
          className={classes.companyEmailTF}
          size="small"
          id="outlined-basic"
          label="Email"
          // style={{ margin: "16px 16px 16px 16px" }}
          variant="outlined"
          name="InvoicingContactEmail"
          value={companyProfile.InvoicingContactEmail}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
      </div>
      <h4 className={classes.headerTitle}>Digital Media Links</h4>
      <div className={classes.CompanyContactInfo}>
        <TextField
          className={classes.CompanyContact}
          size="small"
          id="outlined-basic"
          label="Website URL"
          variant="outlined"
          name="WebsiteURL"
          value={companyProfile.WebsiteURL}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          size="small"
          label="LinkedIN"
          variant="outlined"
          name="LinkedIn"
          value={companyProfile.LinkedIn}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
        <TextField
          className={classes.CompanyContact}
          size="small"
          id="outlined-basic"
          label="Facebook"
          variant="outlined"
          name="Facebook"
          value={companyProfile.Facebook}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
        <TextField
          className={classes.companyEmailTF}
          id="outlined-basic"
          label="Twitter"
          size="small"
          variant="outlined"
          name="Twitter"
          value={companyProfile.Twitter}
          onChange={(e) => inputChangeHandler(e)}
          disabled={readOnly}
        />
      </div>
      <h4 className={classes.headerTitle}>Primary Services Offered</h4>
      <div className={classes.PrimaryServices}>
        <div className={classes.CheckboxSection}>
          {primaryServices.map((service: any, index: number) => {
            return (
              <div className={classes.Checkbox}>
                <p>{service.serviceName}</p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={service.Home}
                      onChange={(e) => checkboxChangeHandler(index, e)}
                      name="Home"
                      color="primary"
                      disabled={readOnly}
                    />
                  }
                  label="In-House"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={service.Sub}
                      onChange={(e) => checkboxChangeHandler(index, e)}
                      name="Sub"
                      color="primary"
                      disabled={readOnly}
                    />
                  }
                  label="Sub"
                />
              </div>
            );
          })}
        </div>
      </div>
      {!readOnly && (
        <div className={classes.bottomBtnSection}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={(e) => submitData()}
          >
            Submit
          </Button>
        </div>
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
