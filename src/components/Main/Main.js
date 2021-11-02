import { Checkbox } from "@material-ui/core";
import {
  Error,
  Inbox,
  LocalOffer,
  MoreVert,
  People,
  Refresh,
} from "@material-ui/icons";
import { useState } from "react";
import { Mail } from "..";
import { useAppContext } from "../../context/context";
import { useMailContext } from "../../context/MailContext";
import "./Main.css";
const Main = () => {
  const { openDrawer } = useAppContext();
  const {
    currentUser,
    onScreenMails,
    mailType,
    setMailType,
    socialUnreadNo,
    primaryUnreadNo,
    promosUnreadNo,
    updatesUnreadNo,
  } = useMailContext();

  const [active, setActive] = useState("primary");

  const updateActive = (localText, globaltext) => {
    setMailType(globaltext);
    setActive(localText);
  };

  return (
    <div className={`main ${openDrawer && "main--fullWidth"}`}>
      <div className="main__controlBtns">
        <Checkbox className="maill__check" />
        <Refresh />
        <MoreVert />
      </div>

      {mailType === "Sent" ? (
        <div></div>
      ) : (
        <div className="main__tabs">
          <div
            onClick={() => updateActive("primary", "Primary")}
            className={`main__tab ${
              active === "primary" && " main__tabPrimary--active"
            }`}
          >
            <Inbox />
            <p>Primary</p>
            {primaryUnreadNo !== 0 && (
              <div className="mail__unread primary--unread">
                {primaryUnreadNo} new
              </div>
            )}
          </div>

          <div
            onClick={() => updateActive("Social", "Social")}
            className={`main__tab ${
              active === "Social" && " main__tabSocial--active"
            }`}
          >
            <People />
            <p>Social</p>
            {socialUnreadNo !== 0 && (
              <div className="mail__unread social--unread">
                {socialUnreadNo} new
              </div>
            )}
          </div>
          <div
            onClick={() => updateActive("Promotions", "Promotions")}
            className={`main__tab ${
              active === "Promotions" && " main__tabPromotions--active"
            }`}
          >
            <LocalOffer />
            <p>Promotions</p>
            {promosUnreadNo !== 0 && (
              <div className="mail__unread promotions--unread">
                {promosUnreadNo} new
              </div>
            )}
          </div>
          <div
            onClick={() => updateActive("Updates", "Updates")}
            className={`main__tab ${
              active === "Updates" && " main__tabUpdates--active"
            }`}
          >
            <Error />
            <p>Updates</p>
            {updatesUnreadNo !== 0 && (
              <div className="mail__unread updates--unread">
                {updatesUnreadNo} new
              </div>
            )}
          </div>
        </div>
      )}

      <div className="main__mails">
        {onScreenMails
          .filter((mail) => mail.recipents === currentUser?.email)
          .map((mail, index) => (
            <Mail key={index} data={mail} />
          ))}
      </div>
    </div>
  );
};

export default Main;
