import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc',
  },
  appBar: {
    backgroundColor: '#ffffff',
    color: theme.palette.text.primary,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1.25rem',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ffffff',
    border: 'none',
    boxShadow: '1px 0 2px 0 rgb(0 0 0 / 0.05)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    margin: '4px 8px',
    '&.Mui-selected': {
      backgroundColor: `${theme.palette.primary.main}14`,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}20`,
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}10`,
    },
  },
  listItemIcon: {
    minWidth: 40,
  },
  logoutButton: {
    margin: theme.spacing(2),
  },
}));

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    history.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
  ];

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt="auto">
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={logout}
          className={classes.logoutButton}
        >
          Logout
        </Button>
      </Box>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            InnovaSoft
          </Typography>
        </Toolbar>
      </AppBar>

      <nav>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          style={{ display: isMobile ? 'none' : 'block' }}
        >
          {drawer}
        </Drawer>
      </nav>

      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
