// TRANSITIONS
// there are multiple kinds of transitions

// INTERNAL
// do not execute entry and exit
// actions on parent state node
// we only make transitions do not trigger
// we should use dot (.) before the name
// it indicates to state that the machine is a transition
// between children states of the current state

// EXTERNAL
// do execute entry and exit actions on parent state node
// use plain names or IDs for external transitions

// EVENTLESS
// can happen on state entry
// use special always property for eventless transitions
// if we aren't already
// state machine will automatically
// check the guard is called some guard

// FORBIDDEN
// explicity way to defining that some transitions
// cannot take a place
// in order to define forbidden transitions
// we should assign udefined as an even handler

import React from "react";
// createMachine
// does the same thing as
// machine creator
import { createMachine } from "xstate";

// useMachine hook
import { useMachine } from "@xstate/react";

// we will send the ref (video) as an argument

// we assign a second argument
// we assign false as a default value for autoplay
const playerMachine = (ref, { autoplay } = { autoplay: false }) =>
  createMachine(
    {
      id: "player",
      context: {
        ref,
      },
      initial: "paused",
      // transitions between states can happen on events
      states: {
        unknown: {
          always: [
            {
              target: "playing",
              cond: "shouldAutoplay",
            },
            {
              target: "paused",
            },
          ],
        },
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
      // GUARDS
      guards: {
        shouldAutoplay: () => autoplay,
      },
      // ACTIONS
      actions: {
        play: (context) => {
          console.log("PLAY");
          if (context.ref && context.ref.current) {
            context.ref && context.ref.current.play();
          }
        },
        stop: (context) => {
          console.log("STOP");
          if (context.ref.current) {
            context.ref.current.pause();
          }
        },
      },
    }
  );

export default function App() {
  const ref = React.useRef(null);
  const machine = playerMachine(ref, { autoplay: true });
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
