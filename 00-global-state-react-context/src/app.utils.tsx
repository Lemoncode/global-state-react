import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { pink } from "@material-ui/core/colors";
import { useDescriptionStyles } from "./app.styles";

/**
 * Flasher hook.
 */
export const useFlasher = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute(
        "style",
        `box-shadow: 0 0 8px 1px ${pink["600"]};
         background-color: ${pink["50"]};
         transition: box-shadow 50ms ease-out;`
      );
      setTimeout(() => {
        if (ref.current) {
          ref.current.setAttribute("style", "");
        }
      }, 100);
    }
  });
  return ref;
};

/**
 * App Description and usage.
 */
export const AppDescription = () => {
  const classes = useDescriptionStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textPrimary" align="center">
        Global State
      </Typography>
      <Typography variant="h5" color="secondary" align="center">
        - Using React Context -
      </Typography>
      <br />
      <Typography variant="h6" color="textPrimary" align="left">
        Approach
      </Typography>
      <Typography
        variant="body2"
        color="textPrimary"
        align="justify"
        paragraph={true}
      >
        State is implemented via <i>useReducer</i> hook. Then, we set 2 contexts
        for sharing the state and its <i>dispatch</i> function in the tree.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>PROS</b>: Native implementation. No third party dependencies.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>CONS</b>: A change in a single property of the state forces a render
        in every component subscribed to the state, which is done through{" "}
        <i>useContext</i> hook. <b>IMPORTANT</b>: the problem here is not{" "}
        <i>useContext</i>, which works as expected by design: it doesn't let you
        subscribe to a part of the context without fully re-rendering. It is
        just a limitation in the pattern itself: storing unrelated properties
        within a single context may not be a good idea.
      </Typography>
      <br />
      <Typography variant="h6" color="textPrimary" align="left">
        Usage
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        Each card below represents a component consuming a single property of
        the global state. Play with them and update the state value. A{" "}
        <span className={classes.highlight}>pink</span> flash on the card means
        it has re-rendered.
      </Typography>
    </div>
  );
};
