import React,{useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../Security/AuthContext';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#973535',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#973535',
}));

const LogoImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '80px',
    marginRight: '8px',
  },
}));

const AvatarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(2),
  },
}));

const ResponsiveAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const ResponsiveMenu = styled(Menu)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiPaper-root': {
      width: 'auto',
    },
  },
}));

const ResponsiveMenuItem = styled(MenuItem)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function ResponsiveDrawer({children}) {

  const navigate = useNavigate();
  const {logout}=useAuth();

  const handleAccountclick = () => {

    navigate('/useracc');
  };


  const handleItemClick = (text) => {
    console.log(`${text} Clicked`);

    // Add logic here for each item click
    if (text === "Home") {
      navigate('/userreq');
    } else if (text === "My Request") {
      navigate('/request');
    } else if (text === "Log Out") {
      logout();
      navigate('/userlogin');
    }
  };

  
  const handleDashboardclick = () => {
    navigate('/userreq');
  };

  const handleLogoutClick= () => {
    logout();
    navigate('/userlogin');
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token=localStorage.getItem('myAppToken');
        const response = await axios.post('http://localhost:4000/userdataheader',null,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        
        });
        setUser(response.data);
        console.log(response.data);
  
      } catch (error) {
        console.error('Error fetching user ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemHover = (text) => {
    setHoveredItem(text);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: '#973535',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <LogoImage src="https://eapl15616.weebly.com/uploads/1/4/6/1/146126864/navbar-logo3-300x42_orig.png" alt="Logo" />
          <AvatarContainer>
            <ResponsiveAvatar
              src={user && user.data.image ? `http://localhost:4000/${user.data.image}` : null}
              alt="Avatar"
              sx={{ cursor: 'pointer',
              backgroundColor: user && user.data.image ? null : '#808080',
            }}
              onClick={handleMenuOpen}
            >{user && !user.data.image && <PersonIcon />}</ResponsiveAvatar>
            <ResponsiveMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <ResponsiveMenuItem
                onClick={
                  handleAccountclick
                }
                onMouseEnter={() => handleItemHover('Account')}
                onMouseLeave={() => handleItemHover(null)}
                style={{
                  color: hoveredItem === 'Account' ? '#eec01f' : '#973535',
                }}
              >
                <ListItemIcon style={{ color: hoveredItem === 'Account' ? '#eec01f' : '#973535' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                Account
              </ResponsiveMenuItem>

              <ResponsiveMenuItem
                onClick={
                 handleDashboardclick
                }
                onMouseEnter={() => handleItemHover('Dashboard')}
                onMouseLeave={() => handleItemHover(null)}
                style={{
                  color: hoveredItem === 'Dashboard' ? '#eec01f' : '#973535',
                }}
              >
                <ListItemIcon style={{ color: hoveredItem === 'Dashboard' ? '#eec01f' : '#973535' }}>
                  <DashboardIcon />
                </ListItemIcon>
                Dashboard
              </ResponsiveMenuItem>

              <ResponsiveMenuItem
                onClick={
                  handleLogoutClick
                }
                onMouseEnter={() => handleItemHover('Logout')}
                onMouseLeave={() => handleItemHover(null)}
                style={{
                  color: hoveredItem === 'Logout' ? '#eec01f' : '#973535',
                }}
              >
                <ListItemIcon style={{ color: hoveredItem === 'Logout' ? '#eec01f' : '#973535' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                Logout
              </ResponsiveMenuItem>
            </ResponsiveMenu>
          </AvatarContainer>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: 1,
          },
        }}
        variant={theme.breakpoints.down('sm') ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
      {[{ text: 'Home', icon: <HomeIcon />, color: '#973535' },
        { text: 'My Request', icon: <AssignmentIcon />, color: '#973535' },
        { text: 'Log Out', icon: <LogoutIcon />, color: '#973535' }].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item.text)}
              onMouseEnter={() => handleItemHover(item.text)}
              onMouseLeave={() => handleItemHover(null)}
              sx={{
                '&:hover': {
                  color: hoveredItem === item.text ? '#eec01f' : '#973535',
                },
                color: hoveredItem === item.text ? '#eec01f' : item.color,
              }}
            >
              <ListItemIcon style={{ color: item.color }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
      </Drawer>
      <Main open={open}>
       {children}
      </Main>
    </Box>
  );
}
