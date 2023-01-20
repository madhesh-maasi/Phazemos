import * as React from "react";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import styles from "./App.module.scss";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import CommonService from "../services/CommonService";

import { CustomAlert } from "./CustomAlert";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";
import { createFontStyles, FontWeights } from "office-ui-fabric-react";

export interface IDataGrid {
  ListName: string;
  EditRecord: any;
  Refresh: boolean;
  AddOrEdit: boolean;
  closeAddOrEdit: any;
  record: any;
  inputChangeHandler: any;
  changeActive: any;
  submitData: any;
}

// Styles for the Table
const theme = createTheme({
  palette: {
    primary: {
      main: "#00589A",
    },
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
    backgroundColor: "#d3e5f4",
    color: "#00589A",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important",
  },
  body: {
    fontSize: 15,
    // color: "#636b7a",
    color:'#303133',
    // background:'#ffffff !important',
    padding: "5px 15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // "&:nth-of-type(odd)": {
    //     backgroundColor: "#f5f8fe"
    //   },
  },
}))(TableRow);

export const DataGrid: React.FunctionComponent<IDataGrid> = (
  props: IDataGrid
) => {
  var _commonService: CommonService = new CommonService();

  const [masterData, setMasterData] = useState([]);

  const [cusalert, setAlert] = useState({
    open: false,
    message: "Success",
    severity: "error",
  });

  function init() {
    let customProperty = {
      listName: props.ListName,
      properties: "*,Author/Title",
      expand: "Author",
    };
    _commonService.getList(customProperty, (res: any) => {
      setMasterData([...res]);
    });
  }

  // function changeActive(index: number, event: any) {
  //   let locMasterData = masterData;
  //   locMasterData[index].IsActive = event.target.checked;
  //   updateStatus(locMasterData[index]);
  //   setMasterData([...locMasterData]);
  // }

  function updateStatus(editData: any) {
    _commonService.updateList(
      { listName: props.ListName, ID: editData.ID },
      { IsActive: editData.IsActive },
      (res: any) => {
        setAlert({
          open: true,
          severity: "success",
          message: "Updated successfully",
        });
      }
    );
  }

  useEffect((): any => {
    init();
  }, [props.ListName, props.Refresh]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Created On</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.AddOrEdit && (
              <StyledTableRow style={{background:'#e1f4db'}}>
                <StyledTableCell>
                  <TextField
                    placeholder="Title"
                    size="small"
                    variant="outlined"
                    style={{ width: "100%", backgroundColor: "#fff" }}
                    onChange={props.inputChangeHandler}
                    value={props.record.Title}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <Checkbox
                    color="primary"
                    style={{ background: "#fff" }}
                    checked={props.record.IsActive}
                    onChange={props.changeActive}
                  />{" "}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <div>
                    <CheckIcon
                      onClick={props.submitData}
                      style={{
                        width: 26,
                        height: 26,
                        marginRight: 10,
                        color: "rgb(0, 88, 154)",
                        cursor: "pointer",
                      }}
                    />
                    <ClearIcon
                      onClick={props.closeAddOrEdit}
                      style={{
                        width: 26,
                        height: 26,
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {masterData.map((master: any, index: number) => (
              <StyledTableRow key={master.ID}>
                <StyledTableCell component="th" scope="row" style={{fontWeight:600}}>
                  {master.Title}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  {/* <Checkbox
                    checked={master.IsActive}
                    onChange={(e) => changeActive(index, e)}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  /> */}
                  {master.IsActive ? (
                    <p
                      style={{
                        background: "rgba(43, 214, 0, 0.3)",
                        width: "100px",
                        borderRadius: 10,
                        textAlign: "center",
                        // color: "#30544f",
                        color:'rgba(32, 157, 0, 1)'
                      }}
                    >
                      Active
                    </p>
                  ) : (
                    <p
                      style={{
                        background: "rgba(255, 46, 46, 0.46)",
                        width: "100px",
                        borderRadius: 10,
                        textAlign: "center",
                        // color: "#20242e",
                        color:'#ed1b1b'
                      }}
                    >
                      InActive
                    </p>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                <div style={{display:'flex',alignItems:'center'}}>
                  {/* <Persona
                    styles={{
                      root: {
                        width: 32,
                        margin: "0 10px 0 0",
                        objectFit:'cover'
                      },
                    }}
                    imageUrl={
                      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      // value.Assignee
                    }
                    size={PersonaSize.size32}
                  /> */}
                    <p>  {master.Author.Title}</p>
                    </div>
                 </StyledTableCell>
                <StyledTableCell>
                  {_commonService.formattedDate(new Date(master.Created))}
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: 24,
                      cursor: "pointer",
                    }}
                    onClick={(e) => props.EditRecord(master)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </>
  );
};
