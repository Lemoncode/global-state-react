import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { useAppStyles, useCardStyles } from "./app.styles";
import { useFlasher, AppDescription } from "./app.utils";

const initialGlobalState = {
  num: 0,
  text: "foo",
  bool: false
};
const GlobalStateContext = React.createContext(initialGlobalState);
const DispatchStateContext = React.createContext<any>(undefined);

/**
 * Global State provider & hooks
 */
const GlobalStateProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialGlobalState
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];

/**
 * Sample Number component.
 */
const NumComponent = React.memo(() => {
  const classes = useCardStyles();
  const [state, dispatch] = useGlobalState();
  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`num: ${state.num}`} />
      <CardActions className={classes.action}>
        <Button
          onClick={() => dispatch({ num: state.num + 1 })}
          variant="outlined"
        >
          Increase
        </Button>
        <Button
          onClick={() => dispatch({ num: state.num - 1 })}
          variant="outlined"
        >
          Decrease
        </Button>
      </CardActions>
    </Card>
  );
});

/**
 * Sample Text component.
 */
const TextComponent = React.memo(() => {
  const classes = useCardStyles();
  const [state, dispatch] = useGlobalState();
  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`text: ${state.text}`} />
      <CardActions className={classes.action}>
        <TextField
          onChange={event => dispatch({ text: event.target.value })}
          value={state.text}
        />
      </CardActions>
    </Card>
  );
});

/**
 * Sample Bool component.
 */
const BoolComponent = React.memo(() => {
  const classes = useCardStyles();
  const [state, dispatch] = useGlobalState();

  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`bool: ${state.bool}`} />
      <CardActions className={classes.action}>
        <Switch
          onChange={event => dispatch({ bool: event.target.checked })}
          checked={state.bool}
        />
      </CardActions>
    </Card>
  );
});

/**
 * App component.
 */
export const App = () => {
  const classes = useAppStyles();

  return (
    <GlobalStateProvider>
      <AppDescription />
      <div className={classes.appContainer}>
        <NumComponent />
        <TextComponent />
        <BoolComponent />
      </div>
    </GlobalStateProvider>
  );
};
