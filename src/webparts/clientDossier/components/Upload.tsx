import * as React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Upload.module.scss";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { CustomAlert } from "./CustomAlert";
import CommonService from "../services/CommonService";

export interface IUpload {
  CompanyName: string;
  CompanyID: string;
  CompanyCode: string;
  SiteUrl: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
    secondary: {
      main: "#64748B",
    },
  },
});

export const Upload: React.FunctionComponent<IUpload> = (props: IUpload) => {
  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  var _commonService: CommonService;

  const [allFile, setAllFile] = useState({
    experienceSpreadsheets: {
      title: "Experience spreadsheets",
      path: props.CompanyName + "/Experience Spreadsheets",
      data: [],
      objectName: "experienceSpreadsheets",
    },
    recentMarketingCollateral: {
      title: "Recent marketing collateral",
      path: props.CompanyName + "/Recent marketing collateral",
      data: [],
      objectName: "recentMarketingCollateral",
    },
  });

  const handleFileChange = (e: any, objectName: string) => {
    let objAllFile = allFile;
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
      objAllFile[objectName].data.push(files[index]);
    }
    setAllFile({ ...objAllFile });
  };

  function deleteFile(index: number, objectName: string) {
    _commonService = new CommonService();
    let objAllFile = allFile;
    let files = objAllFile[objectName].data;
    if (files[index]["UniqueId"]) {
      let filePath = allFile[objectName].path + "/" + files[index]["Name"];
      _commonService.deleteFile(filePath, (res) => {
        files.splice(index, 1);
        setAllFile({ ...objAllFile });
        setAlert({
          open: true,
          severity: "success",
          message: "File delete Successfully",
        });
      });
    } else {
      let objAllFile = allFile;
      let files = objAllFile[objectName].data;
      files.splice(index, 1);
      setAllFile({ ...objAllFile });
    }
  }

  function submitFiles() {
    _commonService = new CommonService();
    let objAllFile = allFile;
    let modules = Object.keys(objAllFile);
    modules.forEach((module) => {
      let newFiles = objAllFile[module].data.filter((c) => !c.UniqueId);
      for (let index = 0; index < newFiles.length; index++) {
        _commonService.fileUpload(
          objAllFile[module].path,
          newFiles[index].name,
          newFiles[index]
        );
        if (index + 1 == newFiles.length) {
          loadFiles(module);
        }
      }
    });
    setAlert({
      open: true,
      severity: "success",
      message: "File Uploaded Successfully",
    });
  }

  function loadFiles(module: any) {
    let objAllFile = allFile;
    _commonService.getFiles(objAllFile[module].path, (res) => {
      if (res.length) {
        objAllFile[module].data = res;
      } else {
        objAllFile[module].data = [];
      }
      setAllFile({ ...objAllFile });
    });
  }

  function init() {
    _commonService = new CommonService();
    let modules = Object.keys(allFile);
    modules.forEach((module) => {
      loadFiles(module);
    });
  }

  useEffect((): any => {
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <h3 className={classes.headerTitle}>Uploads</h3>
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
      <div className={classes.uploadSection}>
        <p className={classes.infoTitleSection}>
          Please upload any of the following (pdf, xls, doc, ppt)
        </p>

        {Object.keys(allFile).map((module) => {
          return (
            <div className={classes.upload}>
              <p>{allFile[module].title}</p>
              <div className={classes.uploadItem}>
                <label htmlFor={module}>
                  <input
                    style={{ display: "none" }}
                    id={module}
                    name={module}
                    type="file"
                    multiple
                    onChange={(e) => {
                      handleFileChange(e, allFile[module].objectName);
                    }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    Upload File
                  </Button>
                </label>

                {allFile[module].data.map((file: any, index: number) => {
                  return (
                    <div className={classes.SelectedFiles}>
                      <div className={classes.File}>
                        <span>{file.Name ? file.Name : file.name}</span>
                        <span
                          className={classes.fileDelete}
                          onClick={(e) =>
                            deleteFile(index, allFile[module].objectName)
                          }
                        >
                          x
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes.bottomBtnSection}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => submitFiles()}
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
export default Upload;
