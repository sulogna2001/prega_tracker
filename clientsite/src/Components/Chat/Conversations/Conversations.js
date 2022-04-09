import axios from "axios";
import React ,{useState,useEffect} from "react";
import "./conversation.css";

const Conversations = ({conversation,currentUser}) => {

  const [user,setUser] =useState(null);
  useEffect(() =>{
    const friendId = conversation.members.find(m=>m !== currentUser );
    const getUser=async() =>{
      try{
      const res=await axios("")

      }
      catch(err){
        console.log(err)
      }
    }
  },[])

  return (
    <div className="conversation">
      <span className="conversationName">Sagnik</span>
    </div>
  );
};

export default Conversations;
