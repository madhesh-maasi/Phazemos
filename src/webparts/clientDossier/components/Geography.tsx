import * as React from "react";
import { useEffect, useState } from "react";
import classes from "./Geography.module.scss";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
export interface IGeography {
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
export const Geography: React.FunctionComponent<IGeography> = (
  props: IGeography
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
      <div>
        <h4 className={classes.headerTitle}>
          Number and Type of Resource by Geography
        </h4>
        <div className={classes.NumberTypeSection}>
          <TextField
            className={classes.NTItem}
            id="outlined-basic"
            label="Employee Title"
            variant="outlined"
          />
          <TextField
            className={classes.NTItem}
            id="outlined-basic"
            label="Country of Residence"
            variant="outlined"
          />
          <TextField
            className={classes.NTItem}
            id="outlined-basic"
            label="#"
            variant="outlined"
          />
          <TextField
            className={classes.NTItem}
            id="outlined-basic"
            label="Countries Worked"
            variant="outlined"
          />
          <AddCircleOutlineIcon
            style={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        </div>
      </div>
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};
