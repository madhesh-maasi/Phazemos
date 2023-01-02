import * as React from "react";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import classes from "./ProjectWork.module.scss";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Button } from "@material-ui/core";
export interface IProjectWork {
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
export const ProjectWork: React.FunctionComponent<IProjectWork> = (
  props: IProjectWork
) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      {" "}
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
      <h4 className={classes.headerTitle}>
        List and describe up to five (5) Key Company Differentiators (things
        that your team does often and well)
      </h4>
      <div className={classes.CategorySection}>
        <FormControl
          variant="outlined"
          style={{ width: "30%", margin: "8px 8px 8px 0" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Comments"
          variant="outlined"
          multiline
          rows={4}
          style={{ width: "60%", margin: 8 }}
        />
        <AddCircleOutlineIcon
          style={{
            fontSize: 40,
            color: theme.palette.primary.main,
            margin: 8,
          }}
        />
      </div>
      <h4 className={classes.headerTitle}>
        Fill in the number of projects in the last 3 years and select average
        ticket size range per project
      </h4>
      {/* Pre Populate Section */}
      <div className={classes.NoAndSizeSection}>
        {/* Manipulate from bottom */}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
        {/* Item 1*/}
        <div className={classes.NoAndSizeItem}>
          <p>Bioinformatics / Bioanalysis</p>
          <div className={classes.InputSection}>
            <TextField
              id="outlined-basic"
              label="#"
              variant="outlined"
              className={classes.TextInput}
            />
            <TextField
              id="outlined-basic"
              label="Size"
              variant="outlined"
              className={classes.TextInput}
            />
          </div>
        </div>
        {/* Item 1*/}
      </div>
      {/* Pre Populate Section */}
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};
