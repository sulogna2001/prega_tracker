import React from "react";
<<<<<<< HEAD:clientsite/src/Components/Chat/Chat.js
import { useState , useEffect} from "react";
import NavbarAll from "../Navbar/Navbar";
import "./chat.css";
import Conversations from "./Conversations/Conversations";
import Messenger from "./Messenger/Messenger";
import Online from "./Online/Online";
import axios from "axios";
import { api_url } from "../../Urls/Api";


const Chat = () => {
  const [conversation,setConversation] = useState([]);

  const token = window.localStorage.getItem("token");
  const patientToken = window.localStorage.getItem("patientToken");
  var id;
  if (token) {
    id = JSON.parse(atob(token.split(".")[1]));
  }
  if (patientToken) {
    id = JSON.parse(atob(patientToken.split(".")[1]));
  }
  const userid=id.patientid;
  // console.log(userid);


  useEffect(() => {
    const getConversations=async() =>{
      try{
        const res=await axios.get(api_url +"chat/conversations/" + userid );
        // console.log(res);
        setConversation(res.data)
      }
      catch(err){
        console.log(err);
      }
    }
    getConversations();
  },[userid])

  
  return (
    <div>
      <NavbarAll />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for doctors" className="chatMenuInput"/>
            {conversation?.map((c) =>(
            <Conversations conversation={c} currentUser={userid}/>

            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatMenuWrapper">
            <div className="chatBoxTop">
              <Messenger own={true}/>
              <Messenger own={true}/>
              <Messenger />
            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMessageInput" placeholder="Start typing....."></textarea>
                <button className="chatSubmitButton">Send</button>
=======
import { CssBaseline } from "@mui/material";
import ChatMain from "./ChatMain";
import NavbarAll from "../../Components/Navbar/Navbar";
export const Chat = () => {
  return (
    <div>
      <>
        <CssBaseline />
        <NavbarAll/>
        <div
          className="container-fluid computer"
          style={{ overflow: "hidden" }}
        >
          <div className="row">
            <div className="col-1  px-1 " id="main"></div>
            <div className="col-10  px-3 " id="main">
              {/* <ChatMain/> */}
>>>>>>> 6c6e37081056c4b1b9481d7fce91491435c66633:clientsite/src/Patients Components/Chat/Chat.js
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatMenuWrapper"><Online/></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
