import axios from "axios";
import React ,{useState,useEffect} from "react";
import "./conversation.css";
import { api_url } from "../../../Urls/Api";

const Conversations = ({conversation,currentUser}) => {

  const [user,setUser] =useState(null);
  
  useEffect(() =>{
    const friendId = conversation.members.find(m=>m !== currentUser );
    console.log(friendId)
    const getUser=async() =>{
      try{
      const res=await axios(api_url + "doc/"+ friendId);
        console.log(res);
        setUser(res);
      }
      catch(err){
        console.log(err)
      }
    }
    getUser();
  },[ currentUser,conversation])

  return (
    <div className="conversation">
      <span className="conversationName">Sagnik</span>
    </div>
  );
};

export default Conversations;
