import React from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton as LogoButton } from "@material-ui/core";
import logo from "assets/images/logo.png";
import IconButton from "custom-fields/IconButton";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, removeCurrentUserId } from "app/userSlice";
import userApi from "api/userApi";
import { setNotify } from "app/notifySlice";
import {
  setShowChatForm,
  setSelectedOption,
  resetMessage,
} from "features/Message/messageSlice";
import * as options from "constants/index";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRight: "1px solid #eff1f2",
    padding: "20px 0px",
    "& .navigateBarHeader": {
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #eff1f2",
      paddingBottom: "20px",
    },
    "& .navigateBarContent": {
      display: "flex",
      alignContent: "space-between",
      flexWrap: "wrap",
      flexGrow: "1",
      textAlign: "center",
      padding: "30px 0px",
      "& .navigateBarBody": {
        width: "100%",
        "& .navigateIcon": {
          marginBottom: "40px",
        },
      },
      "& .navigateBarFooter": {
        width: "100%",
        "& .navigateIcon": {
          marginTop: "40px",
        },
      },
    },
  },
});

function NavigateBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { selectedOption } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    userApi
      .logout()
      .then((res) => {
        dispatch(removeToken());
        dispatch(removeCurrentUserId());
        dispatch(resetMessage());
        dispatch(
          setNotify({
            type: "success",
            message: res,
          })
        );
        history.push("/login");
      })
      .catch((err) => {
        dispatch(
          setNotify({
            type: "error",
            message: err,
          })
        );
      });
  };

  const handleClickLogoButton = () => {
    dispatch(setShowChatForm(false));
    history.push("/");
  };

  const handleClickListItem = (event, option) => {
    dispatch(setSelectedOption(option));
  };

  return (
    <div className={classes.root}>
      <div className="navigateBarHeader">
        <LogoButton onClick={handleClickLogoButton}>
          <img src={logo} alt="logo" />
        </LogoButton>
      </div>

      <div className="navigateBarContent">
        <div className="navigateBarBody">
          <div className="navigateIcon">
            <IconButton
              icon="fas fa-comments"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="All Message"
              selected={selectedOption === options.ALL_MESSAGE_OPTION}
              onClick={(event) => handleClickListItem(event, options.ALL_MESSAGE_OPTION)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fa fa-users"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Contact List"
              selected={selectedOption === options.CONTACT_LIST_OPTION}
              onClick={(event) => handleClickListItem(event, options.CONTACT_LIST_OPTION)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fa fa-bell"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Notification"
              badgeContent="4"
              selected={selectedOption === options.NOTIFICATION_OPTION}
              onClick={(event) => handleClickListItem(event, options.NOTIFICATION_OPTION)}
            />
          </div>
        </div>

        <div className="navigateBarFooter">
          <div className="navigateIcon">
            <IconButton
              icon="fas fa-user"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Profile"
              selected={selectedOption === options.PROFILE_OPTION}
              onClick={(event) => handleClickListItem(event, options.PROFILE_OPTION)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fas fa-power-off"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Log out"
              onClick={handleClickLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigateBar;
