import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { pink } from "@material-ui/core/colors";
import { useDescriptionStyles } from "./app.styles";

/**
 * Flasher hook.
 */
export const useFlasher = () => {
  const ref = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    if (ref.current) {
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
 * App Description.
 */
export const AppDescription = () => {
  const classes = useDescriptionStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textPrimary" align="center">
        Global State
      </Typography>
      <Typography variant="h5" color="secondary" align="center">
        - Using react-tracked -
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
        Performant solution based on a third party called react-tracked. It is
        based on React context plus a couple of tweaks: it replaces context
        render propagation with a subscription model and it also uses a proxy
        under the hood as a mechanism to track which part of the state each
        component should render.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>PROS</b>: Very easy to consume. Whenever a change is performed on a
        certain property of the state, only those components consuming that
        property will be affected by a re-render.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>CONS</b>: One dependency is needed.
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
