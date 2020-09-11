import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Container, List, ListItem } from "@material-ui/core";
import { useState } from "react";
import ChatBox from "../ChatBox";
import { convertTimestamp } from "utils";
import { useDispatch, useSelector } from "react-redux";
import messageApi from "api/messageApi";
import {
  setMessageList,
  setCurrentGroupChatId,
  setCurrentGroupChatName,
  setShowChatForm,
  clearMessageList,
} from "features/Message/messageSlice";
import userApi from "api/userApi";

MenuChat.propTypes = {
  groupChats: PropTypes.array,
};

MenuChat.defaultProps = {
  groupChats: null,
};

const useStyles = makeStyles({
  root: {
    padding: "0",
    flexGrow: "1",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(28,157,234,0.15)",
    },
    "& .Mui-selected": {
      backgroundColor: "#eff7fe",
      borderLeft: "4px solid #1c9dea",
    },
  },
  messageContainer: {
    margin: "0px 0px 10px 0px",
  },
});

function MenuChat(props) {
  const classes = useStyles();
  const { groupChats } = props;
  const { currentUserId } = useSelector((state) => state.user);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState(null);
  const dispatch = useDispatch();

  const handleClickListItem = (event, groupChatId, groupChatName) => {
    setSelectedGroupChatId(groupChatId);
    dispatch(setCurrentGroupChatId(groupChatId));
    dispatch(setCurrentGroupChatName(groupChatName));
    dispatch(setShowChatForm(true));
    dispatch(clearMessageList());
    messageApi
      .getMessageList(groupChatId)
      .then((messageList) => {
        let list = [];
        messageList.forEach((message, index) => {
          const { senderId } = message;
          userApi.getUserInfo(senderId).then((userInfo) => {
            const { firstName, lastName } = userInfo;
            const name = firstName + " " + lastName;
            list = list.concat({
              name,
              ...message,
            });
            if (list.length === messageList.length) {
              dispatch(
                setMessageList(
                  list.sort((firstMess, secondMess) => {
                    return secondMess.timestamp > firstMess.timestamp ? -1 : 1;
                  })
                )
              );
            }
          });
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.root}>
      <List>
        {groupChats.map(
          ({ groupChatId, groupChatName, senderId, content, timestamp }) => (
            <ListItem
              className={classes.messageContainer}
              key={groupChatId}
              button
              selected={selectedGroupChatId === groupChatId}
              onClick={(event) =>
                handleClickListItem(event, groupChatId, groupChatName)
              }
            >
              <ChatBox
                name={groupChatName}
                message={
                  senderId === currentUserId ? `You: ${content}` : content
                }
                date={convertTimestamp(timestamp)}
                active={true}
                avatar={null}
              />
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
}

export default MenuChat;
