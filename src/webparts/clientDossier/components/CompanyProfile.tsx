import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./CompanyProfile.module.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export interface ICompanyProfile {
  CompanyName: string;
  CompanyID: string;
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
  return (
    <ThemeProvider theme={theme}>
      <h3 className={classes.headerTitle}>Company Profile</h3>
      <div className={classes.companyDetails}>
        <TextField
          style={{ width: "40%", marginRight: 30 }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          style={{ width: 100 }}
        />
      </div>
      <div className={classes.CompanyContactInfo}>
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="RFP Contact"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Invoicing Contact"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
      </div>
      <h4 className={classes.headerTitle}>Digital Media Links</h4>
      <div className={classes.CompanyContactInfo}>
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Website URL"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="LinkedIN"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Facebook"
          variant="outlined"
        />
        <TextField
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Twitter"
          variant="outlined"
        />
      </div>
      <h4 className={classes.headerTitle} style={{ marginBottom: 12 }}>
        Primary Services Offered
      </h4>
      <div className={classes.PrimaryServices}>
        {/* Checkbox section -1 */}
        <div className={classes.CheckboxSection}>
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Bioinformatics / Bioanalysis</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>eConsent</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>QA / QP</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Biostatistics</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
        </div>
        {/* Checkbox section -1 */}
        {/* Checkbox section -2 */}
        <div className={classes.CheckboxSection}>
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>EDC</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>RBQM</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Clinical Development Planning</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Feasibility</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
        </div>
        {/* Checkbox section -2 */}
        {/* Checkbox section -3 */}
        <div className={classes.CheckboxSection}>
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Registry Studies</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Clinical Monitoring</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Filling / Packaging</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Regulatory Affairs</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
        </div>
        {/* Checkbox section -3 */}
        {/* Checkbox section -4 */}
        <div className={classes.CheckboxSection}>
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Clinical Pharmacology</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Help Desk</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Regulatory Consulting</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Clinical Project Management</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
        </div>
        {/* Checkbox section -4 */}
        {/* Checkbox section -5 */}
        <div className={classes.CheckboxSection}>
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>HEOR</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Clinical Trial Safety</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Hosting</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
          {/* Checkbox */}
          <div className={classes.Checkbox}>
            <p>Regulatory Writing</p>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="In-House"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Sub"
            />
          </div>
          {/* Checkbox */}
        </div>
        {/* Checkbox section -5 */}
      </div>
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};
