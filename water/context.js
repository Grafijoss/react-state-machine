// CONTEXT
// is a place for storing data
// can be initial
// assigned by an action

import React from "react";
// createMachine
// does the same thing as
// machine creator
import { createMachine } from "xstate";

// useMachine hook
import { useMachine } from "@xstate/react";

// we will send the ref (video) as an argument

const playerMachine = (ref) =>
  createMachine(
    {
      id: "player",
      context: {
        ref,
      },
      initial: "paused",
      // transitions between states can happen on events
      states: {
        paused: {
          // when the paused state starts
          // We want the machine call stop action
          entry: "stop",
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
      // ACTIONS
      actions: {
        play: (context) => {
          console.log("PLAY");
          if (context.ref && context.ref.current) {
            context.ref.current.play();
          }
        },
        stop: (context) => {
          console.log("STOP");
          if (context.ref && context.ref.current) {
            context.ref.current.pause();
          }
        },
      },
    }
  );

export default function App() {
  const ref = React.useRef(null);
  const machine = playerMachine(ref);
  const [current, send] = useMachine(machine);

  return (
    <div className="App">
      <video
        src="https://storage.coverr.co/videos/uPkq1PcYNbm7YE4zR4eODFW023Ktm01Uxz?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjA2NzkzNDQyfQ.HLvjRFbZZS7ZiEJ9BlQH9QR2ZgtbviBS6dawpReybDM"
        ref={ref}
      />
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
