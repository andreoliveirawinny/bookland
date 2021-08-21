import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CssBaseline, AppBar, Toolbar, Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './components/menus/Menu'
import { toggleMobileOpen, selectMenu } from './components/menus/menuSlicer';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/calendar/calendar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', },
  appBar: {
    backgroundColor: '#844584',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(3),
    width: '100%'
  },
}));

const PAGES = {
  DASHBOARD: () => <Dashboard />,
  CALENDAR: () => <Calendar />,
  BOOKS: () => <p>BOOKS</p>,
};

export default function Appp() {
  const selectedPage = useSelector(selectMenu);
  const classes = useStyles();
  const dispatch = useDispatch();

  const CurrentPage = PAGES[selectedPage];
  
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          {/** Hanburguer Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
            onClick={() => dispatch(toggleMobileOpen())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {selectedPage}
          </Typography>
        </Toolbar>
      </AppBar>

      <Menu />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <CurrentPage />
      </main>
    </div>
  );
}
