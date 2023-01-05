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
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

import DoneIcon from "@material-ui/icons/Done";

import CommonService from "../services/CommonService";

export interface IDataGrid {
  render: any;
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

// Styles for the Table
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export const DataGrid: React.FunctionComponent<IDataGrid> = (
  props: IDataGrid
) => {
  var _commonService: CommonService;
  const _userDetails: string = "User Details";

  const [companyDetails, setCompanyDetails] = useState([]);

  function init() {
    _commonService = new CommonService();
    let customProperty = {
      listName: _userDetails,
      properties: "*,CompanyID/Title,CompanyID/CompanyID,Author/Title",
      expand: "CompanyID,Author",
    };
    _commonService.getList(customProperty, (res: any) => {
      setCompanyDetails([...res]);
    });
  }

  useEffect((): any => {
    init();
  }, [props.render]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell>Company Code</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Invite Accepted</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
            <StyledTableCell>Created Date</StyledTableCell>
            {/* <StyledTableCell>Action</StyledTableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
          {companyDetails.map((company) => (
            <StyledTableRow key={company.CompanyID.CompanyID}>
              <StyledTableCell component="th" scope="row">
                {company.CompanyID.Title}
              </StyledTableCell>
              <StyledTableCell>{company.CompanyID.CompanyID}</StyledTableCell>
              <StyledTableCell>{company.UserEmailID}</StyledTableCell>

              <StyledTableCell>
                {company.IsInviteAccepted ? (
                  <DoneIcon
                    style={{
                      cursor: "pointer",
                      fontSize: 32,
                      color: theme.palette.success.main,
                    }}
                  />
                ) : (
                  <ClearIcon
                    style={{
                      cursor: "pointer",
                      fontSize: 32,
                      color: theme.palette.error.main,
                    }}
                  />
                )}
              </StyledTableCell>

              <StyledTableCell>{company.Author.Title}</StyledTableCell>
              <StyledTableCell>
                {new Date(company.Created).toISOString().slice(0, 10)}
              </StyledTableCell>

              {/* <StyledTableCell>
                <EditIcon
                  style={{ color: theme.palette.primary.main, fontSize: 32 }}
                  onClick={(e) => props.EditRecord(company)}
                />
              </StyledTableCell> */}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
