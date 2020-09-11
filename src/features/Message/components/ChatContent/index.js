import React from "react";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import MessageBox from "../MessageBox";
import { useSelector } from "react-redux";
import { convertTimestampFull } from "utils";
import Loading from "components/Loading";

const useStyles = makeStyles({
  root: {
    flexGrow: "1",
    height: "500px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
    "& .Mui-selected": {
      backgroundColor: "#eff7fe",
      borderLeft: "4px solid #1c9dea",
    },
  },
});

function ChatContent(props) {
  const classes = useStyles();
  const { messageList } = useSelector((state) => state.message);
  const { currentUserId } = useSelector((state) => state.user);

  const arrChatBox = [];

  for (let i = 0; i < 1; i++) {
    arrChatBox.push(
      <div key={i}>
        {messageList.map(({ senderId, content, timestamp, type, name }) =>
          senderId === currentUserId ? (
            <MessageBox
              position="right"
              content={content}
              timestamp={convertTimestampFull(timestamp)}
              type={type}
            />
          ) : (
            <MessageBox
              name={name}
              position="left"
              content={content}
              timestamp={convertTimestampFull(timestamp)}
              type={type}
            />
          )
        )}
      </div>
    );
  }

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom("messageEnd");
  }, [messageList]);

  return (
    <div id="chatBox" className={classes.root}>
      {messageList.length === 0 ? <Loading /> : arrChatBox.map((box) => box)}
      <div id="messageEnd"></div>
    </div>
  );
}

export default ChatContent;
