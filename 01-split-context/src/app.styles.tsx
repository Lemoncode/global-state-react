import { makeStyles } from "@material-ui/styles";
import { pink } from "@material-ui/core/colors";

export const useAppStyles = makeStyles({
  "@global": {
    body: {
      backgroundColor: "#dddddd",
      marginTop: "2rem"
    }
  },
  appContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});

export const useCardStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "16px",
    minHeight: "140px",
    minWidth: "160px"
  },
  action: {
    padding: "16px"
  }
});

export const useDescriptionStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "16px auto",
    minHeight: "120px",
    width: "75%"
  },
  highlight: {
    color: pink["400"]
  }
});
