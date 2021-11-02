import { Badge } from "@material-ui/core";
import { Inbox, Keyboard, Send, Star, Videocam } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAppContext } from "../../context/context";
import { useMailContext } from "../../context/MailContext";

const SidebarNavBtn = () => {
  const { openDrawer } = useAppContext();
  const { setMailType, inboxUnreadNo } = useMailContext();
  const [active, setActive] = useState("inbox");

  const history = useHistory();
  const updatePrimaryActive = () => {
    history.push("/");
    setMailType("Primary");
    setActive("inbox");
  };
  const sentActive = () => {
    history.push("/");
    setMailType("Sent");
    setActive("sent");
  };
  return (
    <div className="sidebar__btns">
      <div
        onClick={updatePrimaryActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !openDrawer && "sidebar__btnClose"
        } ${active === "inbox" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !openDrawer && "sidebar__btnLeftClose"
          }`}
        >
          {openDrawer ? (
            <>
              <Inbox className="sidebar__icon" />
              <p>Inbox</p>
            </>
          ) : (
            <Badge badgeContent={0} color="error">
              <Inbox className="sidebar__icon" />
            </Badge>
          )}
        </div>
        <div
          className={`sidebar__unread ${!openDrawer && "sidebar__unreadClose"}
          `}
        >
          <p>{inboxUnreadNo}</p>
        </div>
      </div>

      <div
        onClick={sentActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !openDrawer && "sidebar__btnClose"
        }  ${active === "sent" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !openDrawer && "sidebar__btnLeftClose"
          }`}
        >
          {openDrawer ? (
            <>
              <Send className="sidebar__icon" />
              <p>Sent</p>
            </>
          ) : (
            <Badge badgeContent={0} color="error">
              <Inbox className="sidebar__icon" />
            </Badge>
          )}
        </div>
      </div>

      <SideDummyButtons title="Starred" number={5} />
    </div>
  );
};

export default SidebarNavBtn;

const SideDummyButtons = ({ title, number }) => {
  const { openDrawer } = useAppContext();

  return (
    <div
      className={`sidebar__btn sidebar__topBtn  ${
        !openDrawer && "sidebar__btnClose"
      }  `}
    >
      <div
        className={`sidebar__btnLeft ${!openDrawer && "sidebar__btnLeftClose"}`}
      >
        {openDrawer ? (
          <>
            <Star className="sidebar__icon" />
            <p>{title}</p>
          </>
        ) : (
          <Badge badgeContent={number} color="error">
            <Star className="sidebar__icon" />
          </Badge>
        )}
      </div>
    </div>
  );
};

export function MeetBtns() {
  const { openDrawer } = useAppContext();
  return (
    <div className="navabr__meetOptions">
      <p className="navbar__meetTitle">Meet</p>
      <div
        className={`sidebar__btn sidebar__topBtn  ${
          !openDrawer && "sidebar__btnClose"
        }`}
      >
        <div
          className={`sidebar__btnLeft ${
            !openDrawer && "sidebar__btnLeftClose"
          }`}
        >
          {openDrawer ? (
            <>
              <Videocam className="sidebar__icon" />
              <p>New Meeting</p>
            </>
          ) : (
            <Videocam className="sidebar__icon" />
          )}
        </div>
      </div>

      <div
        className={`sidebar__btn sidebar__topBtn  ${
          !openDrawer && "sidebar__btnClose"
        }`}
      >
        <div
          className={`sidebar__btnLeft ${
            !openDrawer && "sidebar__btnLeftClose"
          }`}
        >
          {openDrawer ? (
            <>
              <Keyboard className="sidebar__icon" />
              <p>Join a meeting</p>
            </>
          ) : (
            <Keyboard className="sidebar__icon" />
          )}
        </div>
      </div>
    </div>
  );
}
