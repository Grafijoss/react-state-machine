import React from "react";
// createMachine
// does the same thing as
// machine creator
import { createMachine } from "xstate";

// useMachine hook
import { useMachine } from "@xstate/react";

const playerMachine = createMachine(
  {
    id: "player",
    initial: "paused",
    // transitions between states can happen on events
    states: {
      paused: {
        // when the paused state starts
        // We want the machine call stop action

        // entry
        // wich is executed upon enterin a state
        entry: "stop",

        // exit
        // wich is executed upon exiting a state
        on: {
          // handler event
          PLAY: "playing",
          // this is the short version of
          // PLAY: {
          //   target: 'playing'
          // }
        },
      },
      playing: {
        entry: "play",
        on: {
          STOP: "paused",
        },
      },
    },
  },
  // the second argument
  {
    // ACTION
    // is a function that can be called
    // on an event or transition
    actions: {
      play: () => {
        console.log("PLAY");
      },
      stop: () => {
        console.log("STOP");
      },
    },
  }
);

export default function App() {
  const [current, send] = useMachine(playerMachine);

  return (
    <div className="App">
      <button
        onClick={() => {
          send("STOP");
        }}
      >
        STOP
      </button>
      <button
        onClick={() => {
          send("PLAY");
        }}
      >
        PLAY
      </button>
    </div>
  );
}
