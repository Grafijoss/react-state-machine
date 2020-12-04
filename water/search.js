import React from "react";
import { useMachine } from "@xstate/react";
import { assign, createMachine, send } from "xstate";

const DELAY = 1000;

const searchMachine = createMachine(
  {
    id: "search",
    // we will define the context
    initial: "idle",
    context: {
      // the initial value for phrase will be an empty string
      phrase: "",
      result: undefined,
    },
    on: {
      // events
      TYPE: {
        // we are goingo to call several actions
        actions: ["setPhrase", "sendSearchEvent"],
      },
      SEARCH: {
        target: ".searching",
      },
    },
    states: {
      idle: {},
      searching: {
        invoke: {
          src: "search",
          onDone: {
            action: "setResult",
            target: "idle",
          },
          onError: {
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      setPhrase: assign({
        phrase: (_, event) => event.data,
      }),
      sendSearchEvent: send(
        { type: "SEARCH" },
        {
          id: "searchEvent",
          delay: DELAY,
        }
      ),
      setResult: assign({
        result: (_, event) => event.data,
      }),
    },
    services: {
      search: async () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(Math.random());
          }, 1000);
        });
      },
    },
  }
);

export default function App() {
  const [current, send] = useMachine(searchMachine);
  console.log(current);
  const { phrase, result } = current.context;
  return (
    <div className="App">
      Result: <strong>{result}</strong>
      <br />
      State: <strong>{current.value}</strong>
      <br />
      <br />
      <input
        value={phrase}
        onChange={(event) => {
          send({
            type: "TYPE",
            data: event.target.value,
          });
        }}
      />
    </div>
  );
}
