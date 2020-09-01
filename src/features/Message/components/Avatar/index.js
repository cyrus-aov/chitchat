import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core";
import * as StylesLibrary from "@material-ui/core";

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Avatar.defaultProps = {
  active: false,
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(StylesLibrary.Badge);

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "60px",
  },
});

function Avatar(props) {
  const classes = useStyles();
  const { src, active } = props;

  return (
    <>
      {active ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <StylesLibrary.Avatar src={src} className={classes.root} />
        </StyledBadge>
      ) : (
        <StylesLibrary.Avatar src={src} className={classes.root} />
      )}
    </>
  );
}

export default Avatar;
