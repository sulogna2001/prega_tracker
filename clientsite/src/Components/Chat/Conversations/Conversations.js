<<<<<<< HEAD
import axios from "axios";
import React ,{useState,useEffect} from "react";
import "./conversation.css";
import { api_url } from "../../../Urls/Api";

const Conversations = ({conversation,currentUser}) => {

  const [user,setUser] =useState(null);
  
  useEffect(() =>{
    const friendId = conversation.members.find(m=>m !== currentUser );
    // console.log(friendId)
    const getUser=async() =>{
      try{
      const res=await axios(api_url + "doc/"+ friendId);
        // console.log(res);
        setUser(res);
      }
      catch(err){
        console.log(err)
      }
    }
    getUser();
  },[ currentUser,conversation])
=======
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dummy from "../../assets/upload2.png";
>>>>>>> 902cde283099db8923789d97a4bd4a681282856d

const Conversations = (props) => {
  return (
    <>
      <Card style={{ width: "100%", borderRadius: "30px" }}  onClick={() => props.onClick(props.conversation._id)}>
        <Card.Body
          style={{
            display: "flex",
            background: "cornsilk",
            borderRadius: "30px",
            cursor: "pointer",
            overflowY: "scroll",
           
          }}
        >
          <img
            src={dummy}
            width="79"
            height="81"
            style={{
              borderRadius: "75px",
              filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.121))",
            }}
            alt="im"
          />
          <div style={{ marginLeft: "2vw", }}>
            <Typography style={{fontFamily:'Amaranth'}}>{props.conversation?.name}</Typography>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Conversations;
