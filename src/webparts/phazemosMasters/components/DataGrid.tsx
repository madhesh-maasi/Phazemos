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

import CommonService from "../services/CommonService";

import { CustomAlert } from "./CustomAlert";

export interface IDataGrid {
  ListName: string;
  EditRecord: any;
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
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

  function changeActive(index: number, event: any) {
    let locMasterData = masterData;
    locMasterData[index].IsActive = event.target.checked;
    updateStatus(locMasterData[index]);
    setMasterData([...locMasterData]);
  }

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
  }, [props.ListName]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>IsActive</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Created On</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {masterData.map((master: any, index: number) => (
              <StyledTableRow key={master.ID}>
                <StyledTableCell component="th" scope="row">
                  {master.Title}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <Checkbox
                    checked={master.IsActive}
                    onChange={(e) => changeActive(index, e)}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </StyledTableCell>
                <StyledTableCell>{master.Author.Title}</StyledTableCell>
                <StyledTableCell>
                  {new Date(master.Created).toISOString().slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon
                    style={{ color: theme.palette.primary.main, fontSize: 32 }}
                    onClick={props.EditRecord(master)}
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
