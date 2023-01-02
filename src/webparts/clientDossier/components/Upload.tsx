import * as React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Upload.module.scss";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
let arrSelectedFile = [];
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
const Upload = () => {
  const [fileSelected, setFileSelected] = useState(arrSelectedFile);
  const handleFileSelected = (e) => {
    const files = e.target.files;
    console.log(files);
    arrSelectedFile.push(files[0].name);
    setFileSelected([...arrSelectedFile]);
  };
  return (
    <ThemeProvider theme={theme}>
      <h3 className={classes.headerTitle}>Uploads</h3>
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
      <div className={classes.uploadSection}>
        <p className={classes.infoTitleSection}>
          Please upload any of the following (pdf, xls, doc, ppt)
        </p>
        {/* Item 1 */}
        <div className={classes.upload}>
          <p>Experience spreadsheets</p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 1 */}
        {/* Item 2 */}
        <div className={classes.upload}>
          <p>Recent marketing collateral</p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 2 */}
        {/* Item 3 */}
        <div className={classes.upload}>
          <p>Recent winning proposal</p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 3 */}
        {/* Item 4 */}
        <div className={classes.upload}>
          <p>Client testimonials</p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 4 */}
        {/* Item 5 */}
        <div className={classes.upload}>
          <p>Last complete RFI for a client</p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 5 */}
        {/* Item 6 */}
        <div className={classes.upload}>
          <p>
            Any strategic analyses performed to date (eg: SWOT, 5-Forces, SCP,
            BCG Matrix, etc)
          </p>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
          </div>
        </div>
        {/* Item 6 */}
      </div>
      <div className={classes.uploadSection}>
        <p className={classes.infoTitleSection}>
          Here is a space to upload any forms or documents so we can assist with
          the intake process
        </p>
        <div className={classes.upload}>
          <div className={classes.uploadItem}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                multiple
                onChange={(e) => {
                  handleFileSelected(e);
                }}
              />
              <Button color="secondary" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <div className={classes.SelectedFiles}>
              <div>selected file.png</div>
            </div>
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
export default Upload;
