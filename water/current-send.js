import React from "react";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import "./styles.css";

const waterMachine = Machine({
  id: "water",
  initial: "liquid",
  // STATE
  // is an abstract representation of system
  // in specific point of time
  states: {
    ice: {
      // EVENTS
      // events are actions wich causes transitions
      // between states
      on: {
        // HEAT is the name of the event handler
        // wich this machine will interpret
        // an the it will transition to target
        HEAT: {
          // this a state name
          target: "liquid",
        },
      },
    },
    liquid: {
      on: {
        HEAT: {
          target: "gas",
        },
        FREEZE: {
          target: "ice",
        },
      },
    },
    gas: {
      on: {
        HEAT: {
          target: "plasma",
        },
        FREEZE: {
          target: "liquid",
        },
      },
    },
    plasma: {
      on: {
        FREEZE: {
          target: "gas",
        },
      },
    },
  },
});

export default function App() {
  // it is similar to react useState hook
  // it returns an array of objects

  // current is an object wich holding the machine data
  // is using for detecting current state
  // and current machine data

  // the second is a function wich is called send
  // it is usign to send events to the machine
  const [current, send] = useMachine(waterMachine);

  return (
    <div className="App">
      <h1>{current.value}</h1>
      <button
        onClick={() => {
          send("HEAT");
        }}
      >
        HEAT
      </button>
      <button
        onClick={() => {
          send("FREEZE");
        }}
      >
        FREEZE
      </button>
    </div>
  );
}
