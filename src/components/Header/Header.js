import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import {
  Apps,
  CameraAltOutlined,
  HelpOutline,
  Menu,
  PersonAddOutlined,
  Search,
  Settings,
} from "@material-ui/icons";
import React from "react";
import { useAppContext } from "../../context/context";
import { auth } from "../../lib/firebase";
// import { makeStyles } from "@mui/styles";
import "./Header.css";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const signOut = () => auth.signOut();

  const { currentUser, openDrawer, setOpenDrawer } = useAppContext();
  return (
    <div className="home__header">
      <div className="home__left">
        <Menu
          className="home__menuIcon"
          onClick={() => setOpenDrawer(!openDrawer)}
        />
        <img
          className="home__logo"
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
          alt="Gmail"
        />
      </div>
      <div className="home__center">
        <Search className="home__searchIcon" />
        <input
          type="text"
          className="home__input"
          placeholder="Search emails"
        />
      </div>
      <div className="home__right">
        <HelpOutline />
        <Settings />
        <Apps />
        <div>
          <Avatar onClick={handleClick} />
          <Popover
            open={open}
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
            }}
          >
            <div className="home__popoverContainer">
              <div className="home__popover__top">
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <div className="home__badge">
                      <CameraAltOutlined className="home__camera" />
                    </div>
                  }
                >
                  <Avatar className={classes.large} />
                </Badge>
                <div className="home__text">
                  <div className="home__displayName">
                    {currentUser?.displayName}
                  </div>
                  <div className="home__mail">{currentUser?.email}</div>
                </div>
                <div className="home__btn">Manage your google account</div>
              </div>

              <div className="home__popover__btm">
                <div className="home__addBtn">
                  <PersonAddOutlined className="home__addIcon" />
                  <p>Add another account</p>
                </div>

                <Button
                  variant="outlined"
                  className="home__signOut"
                  onClick={signOut}
                >
                  Sign Out
                </Button>

                <div className="home__popover__footer">
                  <p>Privacy Policy</p>
                  <span>•</span>
                  <p>Terms of service</p>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
