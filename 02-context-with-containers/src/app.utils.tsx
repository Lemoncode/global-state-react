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
        - Using React Context with containers-
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
        Similar to <i>Using React Context</i> approach but adding Redux-like
        containers to stop context re-renders propagating to final components.
        Containers block unwanted re-renders by passing down only the desired
        context part as a prop. Component receiving that prop must be memoized.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>PROS</b>: Native implementation. No third party dependencies.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>CONS</b>: Verbose. Component count increases as well as nodes in DOM.
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
