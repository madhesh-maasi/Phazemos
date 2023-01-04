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
          size="small"
          style={{ width: "40%", marginRight: 30 }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="ID"
          variant="outlined"
          style={{ width: 100 }}
        />
      </div>
      <div className={classes.CompanyContactInfo}>
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="RFP Contact"
          variant="outlined"
        />
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Invoicing Contact"
          variant="outlined"
        />
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
      </div>
      <h4 className={classes.headerTitle}>Digital Media Links</h4>
      <div className={classes.CompanyContactInfo}>
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Website URL"
          variant="outlined"
        />
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="LinkedIN"
          variant="outlined"
        />
        <TextField
          size="small"
          className={classes.CompanyContact}
          id="outlined-basic"
          label="Facebook"
          variant="outlined"
        />
        <TextField
          size="small"
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
      </div>
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};
