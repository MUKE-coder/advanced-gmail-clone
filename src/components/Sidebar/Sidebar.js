import { useAppContext } from "../../context/context";
import "./Sidebar.css";
import { Chat, Person } from "@material-ui/icons";
import { Avatar, Badge, Drawer, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import SidebarNavBtn, { MeetBtns } from "./SidebarNavBtn";
const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  openDrawer: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: "70px",
    },
  },
}));
const Sidebar = ({ children }) => {
  const { currentUser, openDrawer, setComposeOpen } = useAppContext();

  const classes = useStyles();
  return (
    <div className="sidebar">
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.openDrawer]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          })}
          classes={{
            paper: clsx({
              [classes.openDrawer]: openDrawer,
              [classes.drawerClose]: !openDrawer,
            }),
          }}
        >
          <div
            onClick={() => setComposeOpen(true)}
            className={`sidebar__compose ${
              !openDrawer && "sidebar__composeClose"
            }`}
          >
            <img
              className="sidebar__addIMG"
              src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
              alt="add"
            />
            <p>Compose</p>
          </div>
          <SidebarNavBtn />
          <MeetBtns />

          <div className="sidebar__hangoutsOptions">
            <div className="sidebar__hangoutsWrapper">
              <p className="navbar__meetTitle">Hangouts</p>

              <div className="sidebar__Hangoutsbadge">
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  overlap="circle"
                  color="error"
                  variant="dot"
                >
                  <Avatar className="sidebar__avatarSmall" />
                </Badge>
                <p>{currentUser?.displayName}</p>
              </div>
            </div>
          </div>
          <div className="sidebar__hangoutChats">
            <div className="sidebar__hangoutImg"></div>

            <p>No recent chats</p>
            <p>Start a new one</p>
          </div>

          <div className="sidebar__footer">
            <Person />
            <Chat />
          </div>
        </Drawer>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
