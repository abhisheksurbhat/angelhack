import React, { useState, useEffect, useRef } from "react";
import MessageList from "./message-list";
import io from "socket.io-client";

const socket = io("localhost:8080");
const role = process.env.REACT_APP_USER;
export default function ChatList(props) {
  const project_id = props.match.params.projectId;
  console.log("proj id", project_id);
  console.log("role", role);
  const [messages, addMessages] = useState([]);
  const [chatMessage, addString] = useState("");
  useEffect(() => {
    socket.emit("REGISTER", { project_id, role: process.env.REACT_APP_USER });
  }, []);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", payload => {
      console.log(payload);

      addMessages([
        { role: payload.role, message: payload.message },
        ...messages
      ]);
    });
    console.log("messages", messages);
  }, [messages]);

  let handleSubmit = message => {
    console.log(role, message);
    socket.emit("SEND_MESSAGE", { project_id, role, message });
  };
  const ref = useRef();
  return (
    <div className={"chat"}>
      <MessageList messages={messages} />
      <div className={"send-message"}>
        <textarea ref={ref} className={"textfield"} />
        <div className={"send-button"}>
          <button
            onClick={e => {
              console.log("ref", ref.current.value);
              handleSubmit(ref.current.value);
            }}
          >
            <i className="material-icons">send</i>
          </button>
        </div>
      </div>
    </div>
  );
}
