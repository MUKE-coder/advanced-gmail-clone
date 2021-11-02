import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./context";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
const MailContext = createContext();

export function useMailContext() {
  return useContext(MailContext);
}
export function MailContextProvider({ children }) {
  const [recievedMails, setRecievedMails] = useState([]);
  const [onScreenMails, setOnScreenMails] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const [mailType, setMailType] = useState("Primary");

  const [socialUnreadNo, setSocialUnreadNo] = useState(0);
  const [primaryUnreadNo, setPrimaryUnreadNo] = useState(0);
  const [inboxUnreadNo, setInboxUnreadNo] = useState(0);
  const [promosUnreadNo, setPromosUnreadNo] = useState(0);
  const [updatesUnreadNo, setUpdatesUnreadNo] = useState(0);
  const { currentUser } = useAppContext();
  useEffect(() => {
    if (currentUser) {
      onSnapshot(
        query(collection(db, "recievedMails"), orderBy("timestamp", "desc")),
        (snapshot) => setRecievedMails(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      onSnapshot(
        query(collection(db, "sentMails"), orderBy("timestamp", "desc")),
        (snapshot) => setSentMails(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [currentUser]);

  useEffect(() => {
    setOnScreenMails(recievedMails);
  }, [recievedMails]);

  useEffect(() => {
    if (mailType === "Primary") {
      let primaryMails = recievedMails.filter((allMails) => {
        return allMails.category === "Primary";
      });
      setOnScreenMails(primaryMails);
    }
    if (mailType === "Sent") {
      let primaryMails = sentMails.filter((allMails) => {
        return allMails.senderMail === currentUser?.email;
      });
      setOnScreenMails(primaryMails);
    }
    if (mailType === "Social") {
      const socialMails = recievedMails.filter((allMails) => {
        return allMails.category === "Social";
      });
      setOnScreenMails(socialMails);
    }
    if (mailType === "Promotions") {
      const promotionMails = recievedMails.filter((allMails) => {
        return allMails.category === "Promotions";
      });
      setOnScreenMails(promotionMails);
    }
    if (mailType === "Updates") {
      const updateMails = recievedMails.filter((allMails) => {
        return allMails.category === "Updates";
      });
      setOnScreenMails(updateMails);
    }
  }, [mailType, recievedMails, sentMails]);

  useEffect(() => {
    let unreadMails = recievedMails.filter((allMails) => {
      return allMails.read === false;
    });

    let primaryUnreadEmails = unreadMails.filter((emails) => {
      return emails.category === "Primary";
    });
    primaryUnreadEmails.map((value, index) => {
      let count = index + 1;
      setPrimaryUnreadNo(count);
      return count;
    });
  }, [recievedMails]);

  useEffect(() => {
    let unreadMails = recievedMails.filter((allMails) => {
      return allMails.read === false;
    });
    unreadMails.map((value, index) => {
      let count = index + 1;
      setInboxUnreadNo(count);
      return count;
    });
  }, [recievedMails]);
  useEffect(() => {
    let unreadMails = recievedMails.filter((allMails) => {
      return allMails.read === false;
    });
    let socialUnreadEmails = unreadMails.filter((emails) => {
      return emails.category === "Social";
    });
    socialUnreadEmails.map((value, index) => {
      let count = index + 1;
      setSocialUnreadNo(count);
      return count;
    });
  }, [recievedMails]);

  useEffect(() => {
    let unreadMails = recievedMails.filter((allMails) => {
      return allMails.read === false;
    });
    let promotionsUnreadEmails = unreadMails.filter((emails) => {
      return emails.category === "Promotions";
    });
    promotionsUnreadEmails.map((value, index) => {
      let count = index + 1;
      setPromosUnreadNo(count);
      return count;
    });
  }, [recievedMails]);

  useEffect(() => {
    let unreadMails = recievedMails.filter((allMails) => {
      return allMails.read === false;
    });
    let updatesUnreadEmails = unreadMails.filter((emails) => {
      return emails.category === "Updates";
    });
    updatesUnreadEmails.map((value, index) => {
      let count = index + 1;
      setUpdatesUnreadNo(count);
      return count;
    });
  }, [recievedMails]);

  // console.log("Updates: ", updatesUnreadNo);

  const value = {
    onScreenMails,
    currentUser,
    sentMails,
    setMailType,
    mailType,
    socialUnreadNo,
    primaryUnreadNo,
    inboxUnreadNo,
    promosUnreadNo,
    updatesUnreadNo,
  };
  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}
