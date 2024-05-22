// Request.js
import React, { useEffect, useState } from "react";
import "./Search.css";
import Calender from "../../Components/Calender/Cal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Drawer  from "../../Components/Drawer/Drawer";


const Request = () => {
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [yearResponseData , setYearResponseData] = useState([]);
  const [monthResponseData, setMonthResponseData] = useState([]);
  const [dayResponseData, setDayResponseData] = useState([]);

const navigate = useNavigate();

  const handleClick = () => {
    const combinedData={
      yearData : yearResponseData,
      monthData : monthResponseData,
      dayData: dayResponseData

    }
    navigate("/activity", { state: combinedData });
  };

  
  


  const handleYearDataChange = (data) => {
    setYearData(data.data);
    setYearResponseData(data.responseData);
    setMonthData([]);
    setDayData([]);
    console.log("hi musky1",data.responseData)
    
  };
 

  const handleMonthDataChange = (data) => {
    setMonthData(data.data);
    setMonthResponseData(data.responseData);
    setYearData([]);
    setDayData([]);
    console.log("hi musky2",data.responseData)
   
  };

  const handleDayDataChange = (data) => {
    setDayData(data.data);
    setDayResponseData(data.responseData);
    setMonthData([]);
    setYearData([]);
    console.log("hi musky3",data.responseData)
  };
 



  return (
    <>
      <Drawer />
      <div>
        <div className="blur-image">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div
                style={{
                  marginBottom: "20px",
                  padding: "0px",
                  fontSize: "30px",
                  color: "black",
                  marginLeft: "130px",
                  fontWeight:"bold",
                }}
              >
                Search for Activity
              
              </div>
              <div style={{marginLeft:"90px",fontWeight:"Bold"}}>  click the calender mark to search Activites</div>
              <div style={{ marginLeft: "100px" }}>
                <Calender
                  onYearChange={handleYearDataChange}
                  onMonthChange={handleMonthDataChange}
                  onDataChange={handleDayDataChange}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ height: "450px", overflowY: "auto" }}>
                {yearData.length > 0 && (
                  <>
                    {yearData.map((item, index) => (
                      <div className="request" key={index}>
                        <Grid item xs={6} sx={{ color: "white" }}>
                          <div style={{ marginLeft: "20px" }}>{item}</div>
                        </Grid>
                        <Grid item xs={3}>
                          <div>
                          <Link to={"/activity"}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#973535",
                                  marginLeft: "20px",
                                  borderRadius: "20px",
                                  width: "80px",
                                  height: "3.5vh",
                                  "&:hover": {
                                    backgroundColor: "#811F15",
                                    color: "#EEC01F",
                                  },
                                }}
                                onClick={() =>{handleClick(yearResponseData);console.log("hi1 nakeeb",yearResponseData)}}
                                
                              >
                                view
                              </Button>
                              </Link>
                          
                          </div>
                        </Grid> <Grid item xs={3}>
                          <div>
                            <Link to={"/Report"}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#973535",
                                  marginLeft: "20px",
                                  borderRadius: "20px",
                                  width: "93px",
                                  height: "3.8vh",
                                  "&:hover": {
                                    backgroundColor: "#811F15",
                                    color: "#EEC01F",
                                  },
                                }}
                              >
                                Download
                              </Button>
                            </Link>
                          </div>
                        </Grid>
                      </div>
                    ))}
                  </>
                )}
                {monthData.length > 0 && (
                  <>
                    {monthData.map((item, index) => (
                      <div className="request" key={index}>
                        <Grid item xs={10} sx={{ color: "white" }}>
                          <div style={{ marginLeft: "20px" }}>{item}</div>
                        </Grid>
                        <Grid item xs={2}>
                          <div>
                            <Link to={"/activity"}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#973535",
                                  marginLeft: "20px",
                                  borderRadius: "20px",
                                  width: "100px",
                                  height: "4vh",
                                  "&:hover": {
                                    backgroundColor: "#811F15",
                                    color: "#EEC01F",
                                  },
                                }}
                                onClick={() =>{handleClick(monthResponseData);console.log("hi2 nakeeb",monthResponseData)}}
                              >
                                view
                              </Button>
                            </Link>
                          </div>
                        </Grid>
                      </div>
                    ))}
                  </>
                )}
                {dayData.length > 0 && (
                  <>
                    {dayData.map((item, index) => (
                      <div className="request" key={index}>
                        <Grid item xs={8} sx={{ color: "white" }}>
                          <div style={{ marginLeft: "20px" }}>{item}</div>
                        </Grid>
                        <Grid item xs={2}>
                          <div>
                            <Link to={"/activity"}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#973535",
                                  marginLeft: "20px",
                                  borderRadius: "20px",
                                  width: "100px",
                                  height: "4vh",
                                  "&:hover": {
                                    backgroundColor: "#811F15",
                                    color: "#EEC01F",
                                  },
                                }}
                                onClick={() =>{handleClick(dayResponseData);console.log("hi3 nakeeb",dayResponseData)}}
                              >
                                view
                              </Button>
                            </Link>
                          </div>
                        </Grid>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Request;
