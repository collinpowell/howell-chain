export default {
  breakpoints: [
    "480px",
    "640px",
    "768px",
    "1024px",
    "1220px",
    "1366px",
    "1620px",
  ],
  "&::-moz-selection": {
    background: "text",
    color: "body",
  },
  "&::selection": {
    background: "text",
    color: "body",
  },
  // colors with dark mode
  colors: {
    text: "#000",
    background: "#fff",
    dropDownBg: "#fffffc",
    dropDownBoxShadow: "rgba(0, 0, 0, 0.2)",
    platforms: "rgba(0, 0, 0, 0.1)",
    joinCard: "rgba(0, 0, 0, 0.4)",
    glide: "#C1BCF2",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        dropDownBg: "#131218",
        glide: "#131218",
        dropDownBoxShadow: "rgba(255, 255, 255, 0.2)",
        platforms: "rgba(255, 255, 255, 0.1)",
        joinCard: "rgba(255, 255, 255, 0.4)",
      },
    },
  },
  fonts: {
    body: "Montserrat",
    heading: "Montserrat",
  },
  space: [0, 5, 10, 15, 20, 25, 30, 50, 80, 100, 120, 150],
  fontSizes: [12, 14.1212, 18.53, 20, 27.36, 34.42, 43.4, 64],
  fontWeights: {
    body: 400,
    buttons: 700,
    heading: 700,
    caption: 400,
    subHeading: 500,
    stats: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  // variants for texts
  text: {
    danger: {
      color: 'red',
      fontWeight: 'bold'
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      color: "text",
      fontSize: [4, null, null, 6],
      span: {
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          bottom: "0",
          transform: ["skew(75deg)", null, null, "skew(79deg)"],
          width: "100%",
          height: ["3px", null, null, "4px"],
          bg: "text",
        },
      },
    },
    border: {
      position: "relative",
      variant: "text.heading",
      width: "fit-content",
      wordWrap: "break-word",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "1.1rem",
        height: "1.1rem",
        top: "-2",
        left: "-4",
        borderTopRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        borderTop: "3.6px solid",
        borderLeft: "3.6px solid",
        borderColor: "text",
      },
      "&:after": {
        content: '""',
        position: "absolute",
        width: "1.1rem",
        height: "1.1rem",
        bottom: "-2",
        right: "-4",
        borderTopRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        borderBottom: "3.6px solid",
        borderRight: "3.6px solid",
        borderColor: "text",
      },
    },
    title: {
      fontFamily: "heading",
      color: "text",
      fontWeight: "subHeading",
      fontSize: [3, null, null, 4],
    },
    biggerTitle: {
      fontFamily: "heading",
      color: "text",
      fontWeight: "subHeading",
      fontSize: ["29px", null, null, "36.19px"],
    },
    blockStats: {
      fontFamily: "heading",
      color: "text",
      fontWeight: "stats",
      fontSize: [3, 4, null, null, 5],
    },
    normal: {
      color: "text",
      fontSize: ["15px", null, null, 2],
      fontWeight: "caption",
      lineHeight: "135%",
      letterSpacing: "0.015em",
    },
    smaller: {
      fontSize: [1],
      fontWeight: "subHeading",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      transition: "ease-in .2s",
      fontWeight: "normal",
      WebkitFontSmoothing: "antialiased",
      color: "text",
      a: {
        cursor: "pointer",
        textDecoration: "none",
      },
      label:{
        opacity:'0.95'
      },
      '.react-datepicker':{
        fontFamily: "body",
      },
      ul: {
        listStyle: "none",
      },
      ".logos": {
        fill: 'text'
      },
      ".logosX": {
        fill: 'background'
      },
      ".logoss": {
        stroke: 'text'
      },
      ".logossX": {
        stroke: 'background'
      },
      input: {
        p: '17px 45px !important',
        mr: '3px',
        width: '100%',
        color: 'text !important',
        borderRadius: '5px',
        mb: ['15px', null, null, '0'],
        border: '2.5px solid !important',
        borderColor: 'text !important',
        fontFamily: 'body',
        '&:focus': {
          outline: 'none',
          border: '2px solid !important',
          borderColor: 'text !important',
        }
      },
      '.SweatBtn': {
        fontWeight: 'buttons',
        color: 'text',
        bg: 'background',
        p: '15px 40px',
        borderRadius: '15px',
        fontFamily: 'body',
        border: 'none'
      },
      select: {
        p: '17px 45px',
        mr: '3px',
        borderRadius: '5px',
        minHeight: '58px',
        color: 'text',
        mb: ['15px', null, null, '0'],
        border: '2.5px solid !important',
        borderColor: 'text !important',
        fontFamily: 'body',
        '&:focus': {
          outline: 'none',
          border: '2px solid !important',
          borderColor: 'text !important',
        }
      },
      textarea: {
        p: '17px 45px',
        mr: '3px',
        borderRadius: '5px',
        color: 'text',
        minHeight: '100px',
        mb: ['15px', null, null, '0'],
        border: '2.5px solid !important',
        borderColor: 'text !important',
        fontFamily: 'body',
        '&:focus': {
          outline: 'none',
          border: '2px solid !important',
          borderColor: 'text !important',
        }
      },
    },
  },
  // variants can use custom, user-defined names
  layout: {
    container: {
      maxWidth: ["95%", null, "90%", null, "990px", "1100px", "1255px"],
    },
  },

  // variants for buttons
  buttons: {
    primary: {
      //fontWeight: 'buttons',
      color: "background",
      bg: "text",
      p: ["15px 15px", null, null, "15px 25px"],
      borderRadius: "15px",
      fontFamily: "body",
      transition: '0.3s ease-out',
      '&:hover': {
        transform: 'scale(1.009)',
      },
    },
    text: {
      p: "0",
      color: "text",
      bg: "transparent",
      fontWeight: "buttons",
      fontFamily: "body",
    },
    border: {
      variant: "buttons.text",
      p: ["13px 30px", null, null, "15px 40px"],
      borderRadius: "5px",
      border: "2.65px solid",
      borderColor: "text",
    },
  },
  boxes: {
    primary: {
      background: 'primary',
      text: 'text'
    },
    headerMenuItem: {
      width: "fit-content",
      height: "100%",
      position: "relative",
      //px:'25px',
      cursor: "pointer",
      p: {
        fontWeight: "bold",
      },
    },
    dropDown: {
      transition: "ease-in .5s",
      opacity: "1",
      right: "2.5%",
      //left:'10%',
      top: "85px",
      zIndex: "2000",
      //mx:['20px',null,null,'50px'],
      width: "95%",
      p: "40px",
      position: "absolute",
      background: "dropDownBg",
      boxShadow: "1px 1px 5px",
      borderRadius: "10px",
    },
    stats: {
      textAlign: "center",
      background: "background",
      border: "3px solid",
      borderColor: "text",
      boxShadow: "0.882578px 4.41289px 12.3561px",
      color: "dropDownBoxShadow",
      borderRadius: "22.0645px",
      width: "311px",
      p: "36px 15px",
      mb: "15px",
    },
    icon: {
      background:
        "radial-gradient(50% 50% at 50% 50%, rgba(153, 169, 255, 0.1452) 0%, rgba(68, 95, 237, 0.2772) 100%)",
      borderRadius: "13.2387px",
      padding: "20px",
      textAlign: "center",
      width: "80px",
      height: "80px",
      mb: "21px",
      mx: ["auto", null, null, "auto"],
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    coreCard: {
      minWidth: ["0", null, null, "205px"],
      textAlign: ["center", null, null, "center"],
      h4: {
        mb: "21px",
      },
    },
    blogCard: {
      maxWidth: "541px",
      minWidth: ["0", "0", "0", "0", "0", "541px"],
      img: {
        borderRadius: "22.0645px",
      },
      div: {
        mb: "12.36px",
      },
      h4: {
        mb: "12.36px",
      },
    },
    platform: {
      p: "5px 15px",
      boxShadow: "0.882578px 4.41289px 12.3561px",
      color: "platforms",
      background: "background",
      borderRadius: "13.2387px",
      width: "150px",
      height: "80px",
      mx: "5px",
      svg: {
        width: '100%',
        height: '100%'
      }
    },
    newsLetter: {
      flexDirection: ["column", null, null, "row"],
      textAlign: ["center", null, null, "left"],
      border: "3px solid",
      borderColor: "text",
      borderRadius: "25px",
      padding: ["38px 15px", null, null, "38px 84px"],
      h4: {
        mb: "22px",
      },
      p: {
        mb: ["15px", null, null, "0"],
      },
      div: {
        width: ["100%", null, null, "50%"],
        "&:nth-of-type(2)": {
          height: "fit-content",
          my: "auto",
          flexDirection: ["column", null, null, "row"],
        },
      },
      button: {
        mx: "auto",
        width: ["fit-content", null, null, "inherit"],
      },
    },
    joinCard: {
      boxShadow: "0.882578px 4.41289px 12.3561px",
      color: "joinCard",
      borderRadius: "22.0645px",
      position: "relative",
      padding: ["45px 15px", null, null, "75px 40px"],

      width: ["100%", null, null, "531px"],
      h4: {
        mb: ["11px", null, null, "26px"],
      },
      p: {
        mb: ["21px", null, null, "47.53px"],
      },
    },
    glide: {
      background: "glide",
      padding: ["30px 25px", null, null, "55px 45px"],
      borderRadius: "39.7px",
    },
  },
};
