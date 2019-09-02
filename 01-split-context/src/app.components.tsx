import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { useAppStyles, useCardStyles } from "./app.styles";
import { useFlasher, AppDescription } from "./app.utils";

const numInitialState = { num: 0, setNum: (number: number) => {} };
const textInitialState = { text: "foo", setText: (text: string) => {} };
const boolInitialState = { bool: false, setBool: (mybool: boolean) => {} };

const NumStateContext = React.createContext(numInitialState);
const TextStateContext = React.createContext(textInitialState);
const BoolStateContext = React.createContext(boolInitialState);

/**
 * Global State provider & hooks
 */
const GlobalStateProvider: React.FunctionComponent = ({ children }) => {
  const [num, setNum] = React.useState(numInitialState.num);
  const [text, setText] = React.useState(textInitialState.text);
  const [bool, setBool] = React.useState(boolInitialState.bool);
  const numContextValue = React.useMemo(() => ({ num, setNum }), [num]);
  const textContextValue = React.useMemo(() => ({ text, setText }), [text]);
  const boolContextValue = React.useMemo(() => ({ bool, setBool }), [bool]);

  return (
    <NumStateContext.Provider value={numContextValue}>
      <TextStateContext.Provider value={textContextValue}>
        <BoolStateContext.Provider value={boolContextValue}>
          {children}
        </BoolStateContext.Provider>
      </TextStateContext.Provider>
    </NumStateContext.Provider>
  );
};

const useNumState = () => React.useContext(NumStateContext);
const useTextState = () => React.useContext(TextStateContext);
const useBoolState = () => React.useContext(BoolStateContext);

/**
 * Sample Number component.
 */
const NumComponent = React.memo(() => {
  const classes = useCardStyles();
  const { num, setNum } = useNumState();
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

/**
 * Sample Text component.
 */
const TextComponent = React.memo(() => {
  const classes = useCardStyles();
  const { text, setText } = useTextState();
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

/**
 * Sample Bool component.
 */
const BoolComponent = React.memo(() => {
  const classes = useCardStyles();
  const { bool, setBool } = useBoolState();

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
