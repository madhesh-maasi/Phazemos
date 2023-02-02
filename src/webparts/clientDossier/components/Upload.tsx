import * as React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Upload.module.scss";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CustomAlert } from "./CustomAlert";
import { CustomDialog } from "./CustomDialog";
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

  const [cusDialog, setCusDialog] = useState(false);

  const [deleteData, setDeleteData] = useState({
    index: 0,
    objectName: "",
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
    recentWinningProposal: {
      title: "Recent winning proposal",
      path: props.CompanyName + "/Recent winning proposal",
      data: [],
      objectName: "recentWinningProposal",
    },
    clientTestimonials: {
      title: "Client testimonials",
      path: props.CompanyName + "/Client testimonials",
      data: [],
      objectName: "clientTestimonials",
    },
    lastcompleteRFIforaclient: {
      title: "Last complete RFI for a client",
      path: props.CompanyName + "/Last complete RFI for a client",
      data: [],
      objectName: "lastcompleteRFIforaclient",
    },
    anystrategicanalysesperformedtodate: {
      title: "Any strategic analyses performed to date",
      path: props.CompanyName + "/Any strategic analyses performed to date",
      data: [],
      objectName: "anystrategicanalysesperformedtodate",
    },
    others: {
      title: "Others",
      path: props.CompanyName + "/Others",
      data: [],
      objectName: "others",
    },
  });

  const [loader, setLoader] = useState(false);

  const handleFileChange = (e: any, objectName: string) => {
    let objAllFile = allFile;
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
      objAllFile[objectName].data.push(files[index]);
    }
    setAllFile({ ...objAllFile });
  };

  function deleteConfirmation(index: number, objectName: string) {
    let objdelete = {
      index: index,
      objectName: objectName,
    };
    setDeleteData({ ...objdelete });
    setCusDialog(true);
  }

  function deleteFile() {
    _commonService = new CommonService();
    let objAllFile = allFile;
    let files = objAllFile[deleteData.objectName].data;
    if (files[deleteData.index]["UniqueId"]) {
      let filePath =
        allFile[deleteData.objectName].path +
        "/" +
        files[deleteData.index]["Name"];
      _commonService.deleteFile(filePath, (res) => {
        files.splice(deleteData.index, 1);
        setAllFile({ ...objAllFile });
        setAlert({
          open: true,
          severity: "success",
          message: "File delete Successfully",
        });
      });
    } else {
      let objAllFile = allFile;
      let files = objAllFile[deleteData.objectName].data;
      files.splice(deleteData.index, 1);
      setAllFile({ ...objAllFile });
    }
  }

  function submitFiles() {
    setLoader(true);
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
      }
    });

    setTimeout(() => {
      setLoader(false);
      init();
      setAlert({
        open: true,
        severity: "success",
        message: "File Uploaded Successfully",
      });
    }, 4000);
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
    console.log("Loaded");
    init();
  }, []);

  console.log("Init");

  return (
    <ThemeProvider theme={theme}>
      {/* <h3 className={classes.headerTitle}>Uploads</h3> */}
      <div className={`${classes.companyDetails} disableInput`}>
        <TextField
          style={{ width: "38%", marginRight: 32 }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          size="small"
          aria-readonly={true}
          name="CompanyName"
          value={props.CompanyName}
          disabled
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="ID"
          variant="outlined"
          className={classes.idTextField}
          aria-readonly={true}
          value={props.CompanyCode}
          disabled
        />
      </div>
      <div className={classes.uploadSection}>
        <p className={classes.infoTitleSection}>
          Please upload any of the following (pdf, xls, doc, ppt)
        </p>
        {/* <div className={classes.uploadSection}> */}
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          {Object.keys(allFile).map((module) => {
            return (
              <div className={classes.upload} style={{ width: "20%" }}>
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
                        <div>
                          <span className={classes.File}>
                            <span>{file.Name ? file.Name : file.name}</span>
                            <span
                              className={classes.fileDelete}
                              onClick={(e) =>
                                deleteConfirmation(
                                  index,
                                  allFile[module].objectName
                                )
                              }
                            >
                              x
                            </span>
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
      </div>

      <div className={classes.bottomBtnSection}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={(e) => submitFiles()}
        >
          Submit
        </Button>
        {loader && <CircularProgress />}
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

      <CustomDialog
        open={cusDialog}
        message={
          "Are you sure? Do you want to delete this file from " +
          props.CompanyName +
          " document library?"
        }
        title="Delete"
        closeDialog={(e) => {
          setCusDialog(false);
        }}
        disagree={(e) => {
          let delData = {
            index: 0,
            objectName: "",
          };
          setDeleteData({ ...delData });
          setCusDialog(false);
        }}
        agree={(e) => {
          deleteFile();
          setCusDialog(false);
        }}
      ></CustomDialog>
    </ThemeProvider>
  );
};
