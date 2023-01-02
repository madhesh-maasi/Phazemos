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

const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

const App = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <Tab label="Company Profile" {...a11yProps(0)} />
          <Tab label="Expertise - Therapeutic" {...a11yProps(1)} />
          <Tab label="Expertise - Regulatory" {...a11yProps(2)} />
          <Tab label="Geography" {...a11yProps(3)} />
          <Tab label="Project Work" {...a11yProps(4)} />
          <Tab label="Uploads" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CompanyProfile CompanyName={""} CompanyID={""} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TherapeuticExpertise />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RegulatoryExpertise CompanyName={""} CompanyID={""} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Geography CompanyName={""} CompanyID={""} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ProjectWork CompanyName={""} CompanyID={""} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Upload />
      </TabPanel>
    </ThemeProvider>
  );
};
export default App;
