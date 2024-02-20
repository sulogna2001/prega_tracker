import React from "react";
import { useState, useEffect, useRef } from "react";
import NavbarAll from "../../Components/Navbar/Navbar";
import "../../Components/Chat/chat.css";
import Conversations from "../../Components/Chat/Conversations/Conversations";

import axios from "axios";
import { api_url } from "../../Urls/Api";
import appli from "../../Database/Firebase";
import { AiOutlineCamera } from "react-icons/ai";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Moment from "react-moment";

const Chatting = () => {
  const [conversation, setConversation] = useState([]);

  const token = window.localStorage.getItem("patientToken");
  var docId;
  if (token) {
    docId = JSON.parse(atob(token.split(".")[1]));
  }

  console.log(docId, token);

  const [chatStarted, setChatStarted] = useState(false); // A boolean state to check whether a user has initiated a chat
  const [chatuser, setChatUser] = useState(""); // A state to have the name of the user whom the logged in user is chatting
  const [chatpic, setChatpic] = useState(""); // A state to have the pic of the user whom the logged in user is chatting
  const [chatid, setChatid] = useState(null); // A state to have the id of the user whom the logged in user is chatting
  const [message, setmessage] = useState(""); // To contain the message sent by the user
  const [convo, setconvo] = useState([]); // To hold the messages retrieved from database
  const [lastmsg, setlastmsg] = useState([]); // Last Message

  const [loading, setloading] = useState(false);
  const [img, setImg] = useState("");
  const [previmg, setprevImg] = useState("");
  const db = appli.firestore();
  const storage = appli.storage();

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setprevImg(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  const initChat = async (user) => {
    setloading(false);
    setChatStarted(true);
    console.log(user);
    setChatid(user);
    const user_uid_2 = docId?.patientid;
    const user_uid_1 = user;
    const id = user_uid_1 + `$` + user_uid_2; // Creating a chat id for the chat room between 2 users docId

    // Storing the chats in the db
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setconvo(msgs); // Retrieving the messages between two particular users in same chat id
    });
    // Last Messages
    const docSnap = await getDoc(doc(db, "lastmsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user_uid_1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastmsg", id), { unread: false });
    }
  };

  console.log(convo);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo]);

  // On Sending a Message to a user
  const messageHandler = async (e) => {
    e.preventDefault();
    console.log(chatid, docId);
    if (message || img) {
      const user_uid_2 = docId?.patientid;
      const user_uid_1 = chatid;
      const id = user_uid_1 + `$` + user_uid_2; // Creating a chat id for the chat room between 2 users docId

      console.log(id);
      // If a user sends an image
      let url;
      if (img) {
        const imgRef = ref(
          storage, // Storing the image url in firebase storage
          `images/${new Date().getTime()} - ${img.name}`,
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      // Firestore database
      await addDoc(collection(db, "messages", id, "chat"), {
        message,
        from: user_uid_2,
        to: user_uid_1,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      });
      await setDoc(doc(db, "lastmsg", id), {
        message,
        from: user_uid_2,
        to: user_uid_1,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        unread: true,
      });
    }
    setmessage("");
    setImg("");
    setprevImg("");
  };

  useEffect(() => {
    axios
      .get(`${api_url}patient/getdo/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setConversation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavbarAll />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper" style={{ textAlign: "center" }}>
            <input
              placeholder="Search for patients"
              className="chatMenuInput"
            />
            {conversation?.map((c) => (
              <Conversations conversation={c} onClick={initChat} />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatMenuWrapper">
            {chatStarted && (
              <>
                <div className="chatBoxTop">
                  <>
                    {" "}
                    {convo?.map((con) => (
                      <div
                        style={{
                          marginTop: "2vh",
                          textAlign:
                            con.from == docId?.patientid ? "right" : "left",
                        }}
                        ref={scrollRef}
                      >
                        {con?.media && (
                          <p
                            className={
                              con.from == docId?.patientid
                                ? "messageStyle1"
                                : "messageStyle"
                            }
                          >
                            {con.media ? (
                              <img
                                src={con.media}
                                alt={con.message}
                                width="120"
                                height="131"
                                style={{
                                  textAlign: "center",
                                  filter:
                                    "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161))",
                                }}
                              />
                            ) : null}
                          </p>
                        )}
                        {con?.message && (
                          <p
                            className={
                              con.from == docId?.patientid
                                ? "messageStyle1"
                                : "messageStyle"
                            }
                          >
                            {con.message}
                          </p>
                        )}
                        <br />
                        <small
                          className={
                            con.from == docId?.patientid ? "date1" : "date"
                          }
                        >
                          <Moment fromNow>{con.createdAt.toDate()}</Moment>
                        </small>
                      </div>
                    ))}
                  </>
                </div>
                <div className="chatBoxBottom">
                  <form
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                    onSubmit={messageHandler}
                  >
                    <div style={{ marginLeft: "2vw" }}>
                      <label htmlFor="img">
                        {previmg ? (
                          <img
                            src={previmg}
                            alt="dummy"
                            width="49"
                            height="51
          "
                            style={{
                              borderRadius: "75px",

                              filter:
                                "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161))",
                            }}
                          />
                        ) : (
                          <AiOutlineCamera />
                        )}
                      </label>

                      <input
                        onChange={(e) => handleImage(e)}
                        type="file"
                        id="img"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </div>
                    <textarea
                      className=" chatMessageInput"
                      type="text"
                      style={{
                        width: "100%",
                        textDecoration: "auto",
                        border: "#55A039",
                      }}
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                      placeholder="Start typing....."
                    ></textarea>
                    <button className="chatSubmitButton">Send</button>
                  </form>
                </div>
              </>
            )}
            {/*
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
