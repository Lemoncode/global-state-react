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
        - Using splitted React Context -
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
        Just split your context instead of storing everything in a monolith.
        Separation can be made based on how they impact your component tree.
        Keep frequently changing values separated.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>PROS</b>: Native implementation. No third party dependencies.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="justify">
        <b>CONS</b>: State implementation can be verbose compared to other
        approaches.
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
