import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CompanyProfile } from "./CompanyProfile";
import TherapeuticExpertise from "./TherapeuticExpertise";
import { RegulatoryExpertise } from "./RegulatoryExpertise";
import { Geography } from "./Geography";
import { ProjectWork } from "./ProjectWork";
import Upload from "./Upload";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import CommonService from "../services/CommonService";
import { UserCustomActionRegistrationType } from "@pnp/sp/user-custom-actions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
  },
});

export interface IApp {
  CurrentContext: any;
}

export const App: React.FunctionComponent<IApp> = (props: IApp) => {
  var _userDetails: string = "User Details";
  var _companyRegistration: string = "Company Registration";

  const [value, setValue] = useState(0);

  const [formData, setFormData] = useState({
    companyID: null,
    companyCode: null,
    companyName: null,
    companyProfile: false,
    therapeuticExpertise: false,
    regulatoryExpertise: false,
    geography: false,
    projectWork: false,
    uploads: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, CurrentContext, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  function init() {
    let _commonService = new CommonService();
    let customProperty = {
      listName: _userDetails,
      filter:
        "UserEmailID eq '" +
        props.CurrentContext.pageContext.user.loginName +
        "'",
    };
    _commonService.getList(customProperty, (userres: any) => {
      if (userres.length) {
        customProperty = {
          listName: _companyRegistration,
          filter: "ID eq '" + userres[0].CompanyIDId + "'",
        };
        _commonService.getList(customProperty, (res: any) => {
          let data = formData;
          data.companyID = res[0].ID;
          data.companyCode = res[0].CompanyID;
          data.companyName = res[0].Title;
          data.companyProfile = res[0].CompanyProfile;
          data.therapeuticExpertise = res[0].TherapeuticExpertise;
          data.regulatoryExpertise = res[0].RegulatoryExpertise;
          data.geography = res[0].Geography;
          data.projectWork = res[0].ProjectWork;
          data.uploads = res[0].Uploads;
          setFormData({ ...data });
        });
      }
    });

  }

  useEffect((): any => {
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {formData.companyProfile && (
            <Tab label="Company Profile" {...a11yProps(0)} />
          )}
          {formData.therapeuticExpertise && (
            <Tab label="Expertise - Therapeutic" {...a11yProps(1)} />
          )}
          {formData.regulatoryExpertise && (
            <Tab label="Expertise - Regulatory" {...a11yProps(2)} />
          )}
          {formData.geography && <Tab label="Geography" {...a11yProps(3)} />}
          {formData.projectWork && (
            <Tab label="Project Work" {...a11yProps(4)} />
          )}
          {formData.uploads && <Tab label="Uploads" {...a11yProps(5)} />}
        </Tabs>
      </AppBar>
      {formData.companyProfile && (
        <TabPanel value={value} index={0}>
          <CompanyProfile CompanyName={formData.companyName} CompanyID={formData.companyID} CompanyCode={formData.companyCode}/>
        </TabPanel>
      )}

      {formData.therapeuticExpertise && (
        <TabPanel value={value} index={1}>
          <TherapeuticExpertise CompanyName={formData.companyName} CompanyID={formData.companyID} CompanyCode={formData.companyCode}/>
        </TabPanel>
      )}

      {formData.companyProfile && (
        <TabPanel value={value} index={2}>
          <RegulatoryExpertise  CompanyName={formData.companyName} CompanyID={formData.companyID} CompanyCode={formData.companyCode} />
        </TabPanel>
      )}

      {formData.geography && (
        <TabPanel value={value} index={3}>
          <Geography  CompanyName={formData.companyName} CompanyID={formData.companyID} CompanyCode={formData.companyCode}/>
        </TabPanel>
      )}

      {formData.projectWork && (
        <TabPanel value={value} index={4}>
          <ProjectWork CompanyName={""} CompanyID={""} />
        </TabPanel>
      )}

      {formData.uploads && (
        <TabPanel value={value} index={5}>
          <Upload />
        </TabPanel>
      )}
    </ThemeProvider>
  );
};
