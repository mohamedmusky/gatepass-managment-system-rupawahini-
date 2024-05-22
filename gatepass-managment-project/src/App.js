import React,{useContext,useEffect,useState} from 'react';
import {AppRoutes} from './Data/AppRoutes';
import { BrowserRouter , Route, Routes,Navigate} from 'react-router-dom';
import { AuthContext,AuthProvider,useAuth } from './Security/AuthContext';
import Home from './Pages/Home/Home';
import User_Login from './Pages/Login/User_login';
import Staff_Login from './Pages/Login/Staff_Login';
import Usersignup from './Pages/signup/usersignup';
import Staffsignup from './Pages/signup/staffsignup';
import Forgot from './Pages/Password/Forgot_Pwd';
import Change from './Pages/Password/Change_Pwd'; 
import StaffFogot from './Pages/Password/StaffFogot_Pwd';
import StaffChange from './Pages/Password/StaffChange_Pwd';
import Useremailverify from './Pages/signup/Useremailverify';
import Staffemailverify from './Pages/signup/Staffemailverify';




function App() {
  let routes=Object.values(AppRoutes);
  
    return (
      <AuthProvider>
      <div className="App">
        <BrowserRouter>
          
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/userlogin" element={<User_Login />} />
  <Route path="/stafflogin" element={<Staff_Login />} />
  <Route path="/usersignup" element={<Usersignup />} />
  <Route path="/staffsignup" element={<Staffsignup />} />
  <Route path="/forgot" element={<Forgot />} />
  <Route path="/change/:id/:token" element={<Change />} />
  <Route path="/staffforgot" element={<StaffFogot />} />
  <Route path="/staffchange/:id/:token" element={<StaffChange />} />
  <Route path="/useremailverify" element={<Useremailverify />} />
  <Route path="/staffemailverify" element={<Staffemailverify />} />


  {routes.map((route, index) => {
    return (
      <Route key={index} path={route.path} element={<PrivateRoute >{route.component}</PrivateRoute>} />
    );
  })}

</Routes>
        </BrowserRouter>
      </div> 
    </AuthProvider>
    );
  }

  function PrivateRoute({ children }) {
    const { isAuthenticated, authenticate, logout } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const token = localStorage.getItem('myAppToken');
      if (token) {
        authenticate(token);
      }
      else {
        
        logout();
      }
      setLoading(false);
    }, [authenticate, logout]);

    if (loading) {
      return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/" />;
  }

    
    
  
  
export default App;
