import React from "react";
import Drawer from "../../Components/Drawer/Drawer";
import { Button, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "./Report.css";
import { Link } from "react-router-dom";

const data = [
  {
    officerName: "John Deo",
    date: "January, 2022",
    noOfDaysExceeded: 1,
    noOfHoursExceeded: 2,
    serviceUnit: "Production Unit",
    serviceNo: "  Production Coordinator",
  },
];

const Report = () => {
  const downloadReport = () => {
    // Generate report content
    const reportContent = generateReportContent();

    // Create a blob with HTML content
    const blob = new Blob([reportContent], { type: "text/html" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob); 

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "report.html";

    // Click the link to trigger the download
    link.click();
  };

  const generateReportContent = () => {
    // Generate HTML content for the report
    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Report</title>
        <style>
          body {
            margin-top:20px;
            margin: 0;
            padding: 0;
            
          }
          .blur-image1 {
            background-color: rgb(247, 229, 229);
            border: 10px solid #811F15 ;
            border-radius: 10px;
            width: 94vw;
            height: 91vh;
            margin-top: 30px;
            margin:0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          .Report-head {
            margin-bottom: 20px; 
            font-size: 30px;
            font-weight: bold;
            color:#811F15;
          }
          .report-detail-item {
            margin-bottom: 15px;
          }
          .detail-label {
            font-weight: bold;
            color:#811F15;
          }
          .detail-value {
            margin-left: 10px;
            color:#811F15;
          }
        </style>
      </head>
      <body>
        <div class="blur-image1">
          <div class="Report-head">
            Sri Lanka Rupavahini Corporation Monthly Report
          </div>
          ${data.map(
            (item, index) => `
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">Officer Name:</span>
                <span class="detail-value">${item.officerName}</span>
              </div>
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">Position and service No:</span>
                <span class="detail-value">${item.serviceNo}</span>
              </div>
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">Unit/Division of service:</span>
                <span class="detail-value">${item.serviceUnit}</span>
              </div>
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">Date:</span>
                <span class="detail-value">${item.date}</span>
              </div>
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">No. of days exceeded the time limit:</span>
                <span class="detail-value">${item.noOfDaysExceeded}</span>
              </div>
              <div class="report-detail-item" key=${index}>
                <span class="detail-label">No. of hours exceeded within the month:</span>
                <span class="detail-value">${item.noOfHoursExceeded}</span>
              </div>
            `
          )}
        </div>
      </body>
      </html>
    `;

    return reportHtml;
  };

  return (
    <>
      <Drawer />
      <div className="bod1">
        <div className="blur-image2">
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh" }}
          >
            <Grid item xs={12} md={8} lg={6} xl={4}>
              <div className="blur-image1 report-container">
              
          {data.map((item, index) => (
                  <div key={index}>
                    <div className="Report-head">
                      Sri Lanka Rupavahini Corporation Monthly Report
                    </div>

                    <div className="report-detail-item">
                      <span className="detail-label">Officer Name:</span>
                      <span className="detail-value">{item.officerName}</span>
                    </div>
                    <div className="report-detail-item">
                      <span className="detail-label">
                        Position and service No:
                      </span>
                      <span className="detail-value">{item.serviceNo}</span>
                    </div>
                    <div className="report-detail-item">
                      <span className="detail-label">
                        Unit/Division of service:
                      </span>
                      <span className="detail-value">{item.serviceUnit}</span>
                    </div>

                    <div className="report-detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{item.date}</span>
                    </div>
                    <div className="report-detail-item">
                      <span className="detail-label">
                        No. of days exceeded the time limit:
                      </span>
                      <span className="detail-value">
                        {item.noOfDaysExceeded}
                      </span>
                    </div>
                    <div className="report-detail-item">
                      <span className="detail-label">
                        No. of hours exceeded within the month:
                      </span>
                      <span className="detail-value">
                        {item.noOfHoursExceeded}
                      </span>
                    </div>
                  </div>
                ))}
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      width: "10vw",
                      height: "4vh",
                      marginBottom: "30px",
                      backgroundColor: "#973535",
                      marginTop: "20px",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "#811F15",
                        color: "#EEC01F",
                      },
                    }}
                    onClick={downloadReport}
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Grid container justifyContent="center">
                <Link to={"/search"}>
                <Button
                  variant="contained"
                  sx={{
                    width: "8vw",
                    height: "4vh",
                    backgroundColor: "#973535",
                    marginTop: "20px",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#811F15",
                      color: "#EEC01F",
                    },
                  }}
                >
                  Back
                </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Report;
