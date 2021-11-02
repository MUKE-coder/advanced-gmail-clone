import { Checkbox } from "@material-ui/core";
import { Label, LabelOutlined, Star, StarBorder } from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import "./Mail.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useHistory } from "react-router";
const Mail = ({ data }) => {
  const [starred, setStarred] = useState(false);
  const [important, setImportant] = useState(false);
  const formatedDate = moment
    .unix(data.timestamp?.seconds)
    .format("MMM DD, YY");
  const history = useHistory();
  const updateRead = () => {
    history.push(`/${data.id}`);
    if (data.read === false) {
      updateDoc(doc(db, "recievedMails", data.id), {
        ...data,
        read: true,
      });
    }
  };
  return (
    <div
      onClick={updateRead}
      className={`mail ${data.read === false && "mail--unread"}`}
    >
      <Checkbox className="mail--colorGray mail---hoverBlack" />
      {starred ? (
        <Star onClick={() => setStarred(!starred)} className="mail--Yellow" />
      ) : (
        <StarBorder
          onClick={() => setStarred(!starred)}
          className="mail--colorGray mail--hoverBlack"
        />
      )}

      {important ? (
        <Label
          onClick={() => setImportant(!important)}
          className="mail--Yellow mail__label"
        />
      ) : (
        <LabelOutlined
          onClick={() => setImportant(!important)}
          className="mail--colorGray mail--hoverBlack mail__label"
        />
      )}

      <div className="mail__texts">
        <p className="mail__text">{data.sender} </p>
        <div className="mail__titleSubtitle">
          <p className="mail__text">{data.subject}</p>
          <p className="mail__text mail__body">{data.body}</p>
        </div>
        <p className="mail__text">{formatedDate}</p>
      </div>
    </div>
  );
};

export default Mail;
