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

import CommonService from "../services/CommonService";
import ClearIcon from "@material-ui/icons/Clear";

import { CustomAlert } from "./CustomAlert";

export interface IProjectWork {
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
export const ProjectWork: React.FunctionComponent<IProjectWork> = (
  props: IProjectWork
) => {
  const [age, setAge] = React.useState("");
  const [selOpen, setSelOpen] = React.useState(false);

  const [allCategories, setAllCategories] = useState([]);

  const [keyCompanies, setKeyCompanies] = useState([]);
  const [deleteKeyCompanies, setDeleteKeyCompanies] = useState([]);

  var _commonService: CommonService;

  const _project: string = "Project";
  const _projectWorkCompanyDetails: string = "Project Work Company Details";
  const _projectWorkMapping: string = "Project Work Mapping";
  const _projectWorkMaster: string = "Project Work Master";
  const _projectWorkCategoryMaster: string = "Project Work Category Master";

  const selHandleClose = () => {
    setSelOpen(false);
  };

  const selHandleOpen = () => {
    setSelOpen(true);
  };

  function loadCompanyProjectWork(editData: any) {
    let customProperty = {
      listName: _projectWorkCompanyDetails,
      filter: "ProjectIDId eq '" + editData.ID + "'",
    };
    _commonService.getList(customProperty, (res: any) => {
      if (res && res.length > 0) {
        let keyCompany: any = [];
        for (let index = 0; index < res.length; index++) {
          keyCompany.push({
            ProjectIDId: res[index].ProjectIDId,
            CategoryIDId: res[index].CategoryID,
            ID: res[index].ID,
            Description: res[index].Description,
          });
        }
        setKeyCompanies([...keyCompany]);
      } else {
        let keyCompany = [
          {
            ProjectIDId: 0,
            CategoryIDId: 1,
            ID: 0,
            Description: "",
          },
        ];
        setKeyCompanies([...keyCompany]);
      }
    });
  }

  function loadCompanyData() {
    let customProperty = {
      listName: _project,
      filter: "CompanyIDId eq '" + props.CompanyID + "'",
    };
    _commonService.getList(customProperty, (res: any) => {
      if (res && res.length > 0) {
        loadCompanyProjectWork(res[0]);
      } else {
        addKeyCompanies();
      }
    });
  }

  function init() {
    _commonService = new CommonService();
    let customProperty = {
      listName: _projectWorkCategoryMaster,
    };
    _commonService.getList(customProperty, (res: any) => {
      setAllCategories(res);
      loadCompanyData();
    });
  }

  function addKeyCompanies(){
    let keyCompany = keyCompanies;
    keyCompany.push([
      {
        ProjectIDId: 0,
        CategoryIDId: 1,
        ID: 0,
        Description: "",
      },
    ]);
    setKeyCompanies([...keyCompany]);
  }

  function removeKeyCompanies(index){
    let allKeyCompanies = keyCompanies;
    let delData = deleteKeyCompanies;
    if (allKeyCompanies[index].ID != 0) {
      allKeyCompanies[index].IsDeleted = true;
      delData.push(allKeyCompanies[index]);
    }
    allKeyCompanies.splice(index, 1);
    setKeyCompanies([...allKeyCompanies]);
    setDeleteKeyCompanies([...delData]);
  }

  function selHandleChange(event: any, index: number) {
    let allKeyCompanies = keyCompanies;
    allKeyCompanies[index].CategoryIDId = event.target.value;
    setKeyCompanies([...allKeyCompanies]);
  }

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
      <h4 className={classes.headerTitle}>
        List and describe up to five (5) Key Company Differentiators (things
        that your team does often and well)
      </h4>
      {keyCompanies.map((company: any, index: number) => {
        return (
          <div className={classes.CategorySection}>
            <FormControl
              variant="outlined"
              style={{ width: "30%", margin: "8px 8px 8px 0" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Category
              </InputLabel>

              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={selOpen}
                onClose={selHandleClose}
                onOpen={selHandleOpen}
                value={company.CategoryIDId}
                onChange={(e) => selHandleChange(e, index)}
              >
                {allCategories.map((m) => {
                  return <MenuItem value={m.ID}>{m.Title}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Comments"
              variant="outlined"
              multiline
              rows={4}
              style={{ width: "30%", margin: 8 }}
            />

            {keyCompanies.length == index + 1 && (
              <AddCircleOutlineIcon
                onClick={(e) => addKeyCompanies()}
                style={{
                  fontSize: 40,
                  color: theme.palette.primary.main,
                  margin: 8,
                }}
              />
            )}

{keyCompanies.length > 1 && (
                <ClearIcon
                  style={{
                    cursor: "pointer",
                    fontSize: 32,
                    color: theme.palette.error.main,
                  }}
                  onClick={(e) => removeKeyCompanies(index)}
                />
              )}


          </div>
        );
      })}
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
      </div>
      <div className={classes.bottomBtnSection}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};
