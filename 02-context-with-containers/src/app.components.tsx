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
//React.Dispatch<A> = (value: A) => void
const DispatchStateContext = React.createContext<React>(undefined);

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
interface NumProps {
  num: number;
  setNum: (num: number) => void;
}

const NumComponent: React.FC<NumProps> = React.memo(({ num, setNum }) => {
  const classes = useCardStyles();
  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`num: ${num}`} />
      <CardActions className={classes.action}>
        <Button onClick={() => setNum(num + 1)} variant="outlined">
          Increase
        </Button>
        <Button onClick={() => setNum(num - 1)} variant="outlined">
          Decrease
        </Button>
      </CardActions>
    </Card>
  );
});

const NumContainer = () => {
  const [state, dispatch] = useGlobalState();
  const setNum = React.useCallback(num => dispatch({ num }), []);
  return <NumComponent num={state.num} setNum={setNum} />;
};

/**
 * Sample Text component.
 */
interface TextProps {
  text: string;
  setText: (text: string) => void;
}

const TextComponent: React.FC<TextProps> = React.memo(({ text, setText }) => {
  const classes = useCardStyles();
  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`text: ${text}`} />
      <CardActions className={classes.action}>
        <TextField
          onChange={event => setText(event.target.value)}
          value={text}
        />
      </CardActions>
    </Card>
  );
});

const TextContainer = () => {
  const [state, dispatch] = useGlobalState();
  const setText = React.useCallback(text => dispatch({ text }), []);
  return <TextComponent text={state.text} setText={setText} />;
};

/**
 * Sample Bool component.
 */
interface BoolProps {
  bool: boolean;
  setBool: (bool: boolean) => void;
}

const BoolComponent: React.FC<BoolProps> = React.memo(({ bool, setBool }) => {
  const classes = useCardStyles();
  return (
    <Card className={classes.root} ref={useFlasher()}>
      <CardHeader title={`bool: ${bool}`} />
      <CardActions className={classes.action}>
        <Switch
          onChange={event => setBool(event.target.checked)}
          checked={bool}
        />
      </CardActions>
    </Card>
  );
});

const BoolContainer = () => {
  const [state, dispatch] = useGlobalState();
  const setBool = React.useCallback(bool => dispatch({ bool }), []);
  return <BoolComponent bool={state.bool} setBool={setBool} />;
};

/**
 * App component.
 */
export const App = () => {
  const classes = useAppStyles();

  return (
    <GlobalStateProvider>
      <AppDescription />
      <div className={classes.appContainer}>
        <NumContainer />
        <TextContainer />
        <BoolContainer />
      </div>
    </GlobalStateProvider>
  );
};
