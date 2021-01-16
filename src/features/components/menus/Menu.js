import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List, Divider, ListItemText,
  ListItem, ListItemIcon, Hidden, Drawer
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Dashboard as DashboardIcon,
  MenuBook as MenuBookIcon,
  Event as EventIcon
} from '@material-ui/icons';

import { setPage, selectMenu, toggleMobileOpen, isMobileOpen } from './menuSlicer';

const MENU_TEXT = { DASHBOARD: 'Dashboard', CALENDAR: 'Calendar', BOOKS: 'Books' };
const MENU_ICONS = { DASHBOARD: <DashboardIcon />, CALENDAR: <EventIcon />, BOOKS: <MenuBookIcon /> };

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  }
}));

export default function Menu() {
  const selectedPage = useSelector(selectMenu);
  const mobileOpen = useSelector(isMobileOpen);
  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />

      <List style={{ paddingTop: 0 }}>
        {['DASHBOARD', 'CALENDAR', 'BOOKS'].map((text, index) => (
          <ListItem
            style={{ color: selectedPage === text ? 'white' : 'grey', backgroundColor: selectedPage === text ? '#844584' : 'white' }}
            button
            key={text}
            onClick={() => dispatch(setPage(text))}
          >
            <ListItemIcon style={{ color: selectedPage === text ? 'white' : 'grey' }}>{MENU_ICONS[text]}</ListItemIcon>
            <ListItemText primary={MENU_TEXT[text]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={() => dispatch(toggleMobileOpen())}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        >
          {drawer}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <Drawer classes={{ paper: classes.drawerPaper, }} variant="permanent" open>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
