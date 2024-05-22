import React, { useEffect, useState } from "react";
import "./Request.css";
import Grid from "@mui/material/Grid";
import Alert from "../../Components/Alert/Alert";
import Drawer from "../../Components/Drawer/Drawer";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Request = () => {
  const [visitRequests, setVisitRequests] = useState([]);
  const [appoinmentRequests, setAppoinmentRequests] = useState([]);
  const [showReport, setShowReport] = useState({});
  const [activeButton, setActiveButton] = useState(null);

  const [username, setUsername] = useState(null);


  const navigate = useNavigate();

  const handleEdit = (request, type) => {
    if (type === 'visit') {

      navigate("/visit22", { state: request });
    }
    else{
      navigate("/visit11", { state: request });

    }
  };

  const handleViewClick = (requestId) => {
    setShowReport((prevShowReport) => {
      return { ...prevShowReport, [requestId]: !prevShowReport[requestId] };
    });


    // Toggle the active button
    if (activeButton === requestId) {
      setActiveButton(null);
    } else {
      setActiveButton(requestId);
    }
  };


  const handleDeleteRequest = async (requestId, type) => {
    try {
      if (type === "visit") {
        await axios.delete(`http://localhost:4000/deleterupreq/${requestId}`);
        const updatedRequests = visitRequests.filter(
          (request) => request._id !== requestId
        );
        setVisitRequests(updatedRequests);
      } else {
        await axios.delete(
          `http://localhost:4000/deleteappoinment/${requestId}`
        );
        const updatedRequests = appoinmentRequests.filter(
          (request) => request._id !== requestId
        );
        setAppoinmentRequests(updatedRequests);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };


  useEffect(() => {
    const apiUrl = 'http://localhost:4000/userdataheader'; 
    const token = localStorage.getItem('myAppToken');
  
    axios.post(apiUrl, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUsername(response.data.data.username); // Modify this line
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (username) { // Add this line
      axios.get(`http://localhost:4000/user/${username}`)
        .then(response => {
          setVisitRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } // Add this line
  }, [username]);
    
  useEffect(() => {
    if (username) { // Add this line
      axios.get(`http://localhost:4000/appointmentreq/${username}`)
        .then(response => {
          setAppoinmentRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } // Add this line
  }, [username]);


  return (
    <>
      <Drawer />
      <div>

      <div className="bod"> 

        <div className="blur-image">
          <div style={{ height: "450px", overflowY: "auto" }}>
            {visitRequests.map((request) => (
              <div key={request._id}>
                <div className="rectangle-col">
                  <Grid container xs={12} className="rectangle" spacing={0}>
                    <Grid item xs={5}>
                      <div className="request">
                        {request.dateofArrival && request.dateofArrival.split("T")[0]} {request.timeslot}{" "}
                        {request.category}
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Button
                          sx={{
                            backgroundColor:
                              activeButton === request._id
                                ? "#f9f4f4"
                                : "#973535",
                            color:
                              activeButton === request._id
                                ? "#811F15"
                                : "white",
                            border:
                              activeButton === request._id
                                ? "4px solid #EEC01F"
                                : "2px solid white",
                            marginLeft: "20px",
                            borderRadius: "20px",

                            width: "80px",
                            height: "4vh",
                            "&:hover": {
                              border: "4px solid #EEC01F",
                              backgroundColor: "white",
                              color: "#811F15",
                            },
                          }}
                          onClick={() => handleViewClick(request._id)}
                        >
                          View
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#973535",
                            marginLeft: "20px",
                            borderRadius: "20px",
                            border: "2px solid white",
                            width: "80px",
                            height: "4vh",
                            "&:hover": {
                              border: "4px solid #EEC01F",
                              backgroundColor: "white",
                              color: "#811F15",
                            },
                          }}
                          onClick={() => handleEdit(request, "visit")}
                        >
                          Edit
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Alert
                          requestId={request._id}
                          type={"visit"}
                          onDelete={handleDeleteRequest}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </div>
                {showReport[request._id] && (
                  <div className="report">
                    <div className="report-item">
                      <span className="label">Category:</span>
                      <span className="value">{request.category}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Username:</span>
                      <span className="value">{request.username}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Time Slot:</span>
                      <span className="value">{request.timeslot}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Date of Arrival:</span>
                      <span className="value">
                        {request.dateofArrival && request.dateofArrival.split("T")[0]}
                      </span>
                    </div>
                    <div className="report-item">
                      <span className="label">Grade:</span>
                      <span className="value">{request.grade}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Address:</span>
                      <span className="value">{request.address}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Authorized Person:</span>
                      <span className="value">{request.authorfizedperson}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Designation:</span>
                      <span className="value">{request.designation}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Phone No:</span>
                      <span className="value">{request.phoneNo}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">No of Males:</span>
                      <span className="value">{request.noOfmale}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">No of Females:</span>
                      <span className="value">{request.noOffemale}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">No of Teachers:</span>
                      <span className="value">{request.noOfteachers}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">No of Parents:</span>
                      <span className="value">{request.noOfparents}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Note:</span>
                      <span className="value">{request.note}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {appoinmentRequests.map((request) => (
              <div key={request._id}>
                <div className="rectangle-col">
                  <Grid container xs={12} className="rectangle" spacing={0}>
                    <Grid item xs={5}>
                      <div className="request">
                        {request.appoinmentDate && request.appoinmentDate.split("T")[0]}{" "}
                        {request.appoinmentTime} {request.requesterName}
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Button
                          sx={{
                            backgroundColor:
                              activeButton === request._id
                                ? "#f9f4f4"
                                : "#973535",
                            color:
                              activeButton === request._id
                                ? "#811F15"
                                : "white",
                            border:
                              activeButton === request._id
                                ? "4px solid #EEC01F"
                                : "2px solid white",
                            marginLeft: "20px",
                            borderRadius: "20px",

                            width: "80px",
                            height: "4vh",
                            "&:hover": {
                              border: "4px solid #EEC01F",
                              backgroundColor: "white",
                              color: "#811F15",
                            },
                          }}
                          onClick={() => handleViewClick(request._id)}
                        >
                          View
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#973535",
                            marginLeft: "20px",
                            borderRadius: "20px",
                            border: "2px solid white",
                            width: "80px",
                            height: "4vh",
                            "&:hover": {
                              border: "4px solid #EEC01F",
                              backgroundColor: "white",
                              color: "#811F15",
                            },
                          }}
                          onClick={() => handleEdit(request, 'appoinment')}
                        >
                          Edit
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <div className="cancel">
                        <Alert
                          requestId={request._id}
                          type={"appointment"}
                          onDelete={handleDeleteRequest}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </div>
                {showReport[request._id] && (
                  <div className="report">
                    <div className="report-item">
                      <span className="label">userName:</span>
                      <span className="value">{request.username}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Officer Name:</span>
                      <span className="value">{request.officerName}</span>
                    </div>

                    <div className="report-item">
                      <span className="label">Requester Email:</span>
                      <span className="value">{request.requesteremail}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Requester NIC:</span>
                      <span className="value">{request.requesterNIC}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Requester Phone No:</span>
                      <span className="value">{request.requesterPhoneno}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Appointment Date:</span>
                      <span className="value">
                        {request.appoinmentDate.split("T")[0]}
                      </span>
                    </div>
                    <div className="report-item">
                      <span className="label">Appointment Time:</span>
                      <span className="value">{request.appoinmentTime}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Requester Name:</span>
                      <span className="value">{request.requesterName}</span>
                    </div>
                    <div className="report-item">
                      <span className="label">Appoinment Reason:</span>
                      <span className="value">{request.appoinmentReason}</span>
                    </div>

                    {/* Add more report items for appointment request if needed */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div></div>

    </>
  );
};

export default Request;