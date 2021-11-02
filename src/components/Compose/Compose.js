import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import "./Compose.css";
import ComposeMenuItem from "./ComposeMenuItem";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const Compose = () => {
  const {
    setComposeOpen,
    setSnackbarOpen,
    setSnackbarMsg,
    category,
    currentUser,
  } = useAppContext();
  const [recipents, setRecipents] = useState("");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    setID(uuidv4());
  }, []);

  const createMailId = () => {
    setID(uuidv4());
  };
  const sendMail = () => {
    setComposeOpen(false);
    createMailId();
    setSnackbarOpen(true);
    setSnackbarMsg("Sending Mail...");
    //Firebase creating collection
    setDoc(doc(db, "sentMails", /* currentUser.email, "mails", */ id), {
      id: id,
      category: category,
      recipents: recipents,
      subject: subject,
      body: body,
      senderMail: currentUser.email,
      senderName: currentUser.displayName,
      read: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        addRecievedMail();
      })
      .catch((err) => console.log(err));
  };
  const addRecievedMail = () => {
    setDoc(doc(db, "recievedMails", /* recipents, "mails", */ id), {
      id: id,
      category: category,
      recipents: recipents,
      subject: subject,
      body: body,
      senderMail: currentUser.email,
      senderName: currentUser.displayName,
      read: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      setSnackbarMsg("Mail Sent");
    });
  };
  return (
    <div className="compose">
      <div className="compose__container">
        <div className="compose__header">
          <h4>New Message</h4>
          <Close
            onClick={() => setComposeOpen(false)}
            className="compose__icon"
          />
        </div>
        <input
          className="compose__input"
          placeholder="Recipents"
          value={recipents}
          onChange={(e) => setRecipents(e.target.value)}
        />
        <input
          className="compose__input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="compose__textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="compose__footer">
          <div className="compose__footer__container">
            <Button
              className="compose__btn"
              color="primary"
              variant="contained"
              onClick={sendMail}
            >
              Send
            </Button>
            <ComposeMenuItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
