
import UserReq from '../Pages/UserRequestHome/UserReq';
import Dailyactivity from '../Pages/Dailyactivity/Dailyactivity';
import UserAcc from '../Pages/UserProfile/UserProfileAcc';
import UserAccEdit from '../Pages/UserProfile/UserProfileAccEdit';
import UserAccPwd from '../Pages/UserProfile/UserProfilePwd';
import Visit1 from '../Pages/visit/visit1';
import Visit2 from '../Pages/visit/visit2';
import StaffAcc from '../Pages/UserProfile/StaffProfileAcc';
import StaffAccEdit from '../Pages/UserProfile/StaffProfileAccEdit';
import StaffAccPwd from '../Pages/UserProfile/StaffProfilePwd';
import StaffComplain from '../Pages/staffcomplain/staffcomplain';
import Search from '../Pages/Historysearch/staffpagehistory-searchday';
import Activity from '../Pages/staffpagehistory-activity-view/Activity';
import Request from '../Pages/Request/Request'; 
import Staff_req from '../Pages/Staffrequest/Staff_req';
import Form_schools from '../Pages/Forms/Form_school';
import Form_uni from '../Pages/Forms/Form_uni';
import Visit11 from '../Pages/visit/visit11';
import Visit22 from '../Pages/visit/visit22';



export const AppRoutes = {

userreq: {
    path: '/userreq',
    component: <UserReq/>,
    
},
dailyactivity: {
    path: '/dailyactivity',
    component: <Dailyactivity/>,
},
useracc: {
    path: '/useracc',
    component: <UserAcc/>,
},
useraccedit: {
    path: '/useraccedit',
    component: <UserAccEdit/>,
},

useraccpwd: {
    path: '/useraccpwd',
    component: <UserAccPwd/>,
},
visit1: {
    path: '/visit1',
    component: <Visit1/>,
},
visit2: {
    path: '/visit2',
    component: <Visit2/>,
},
search: {
    path: '/search',
    component: <Search/>,
},
activity: {
    path: '/activity',
    component: <Activity/>,
},
request: {
    path: '/request',
    component: <Request/>,
},
staffacc: {
    path: '/staffacc',
    component: <StaffAcc/>,
},
staffaccedit: {
    path: '/staffaccedit',
    component: <StaffAccEdit/>,
},
staffaccpwd: {
    path: '/staffaccpwd',
    component: <StaffAccPwd/>,
},
staffcomplain: {
    path: '/staffcomplain',
    component: <StaffComplain/>,
},
staffreq: {
    path: '/staffreq',
    component: <Staff_req/>,
},
formschools: {
    path: '/formschools',
    component: <Form_schools/>,
},
formsuni:{
    path: '/formsuni',
    component: <Form_uni/>,
},

visit11: {
    path: '/visit11',
    component: <Visit11/>,
},
visit22: {
    path: '/visit22',
    component: <Visit22/>,
},
}