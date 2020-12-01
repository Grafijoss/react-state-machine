// INVOKING SERVICES
// parallel state nodes

// SERVICE
// is a function returning a promise
// are invoked using special invoke property
// Invoke is am object which serves

// onDone
// for resolver promise

// onError
// for rejected promise

// Invoke is am object which serves
// function and to converse on down

// In those handlers we can define
// actions or transitions which will be
// executed on the promise when the promise
// resolves or rejects

// STATES IN PARALLEL
// type is set to parallel
// onDone will be trigger when parallel states
// reach out final state to some states
// which will be executed at the same time

import React from "react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const fetchMachine = createMachine(
  {
    id: "fetch",
    context: {
      data: [],
    },
    initial: "idle",
    // we define a global event
    on: {
      FETCH: {
        // it will transition from any state
        // to pending state
        // it means what ever we will allow
        // for our machine refresh data
        target: "pending",
      },
    },
    states: {
      idle: {},
      pending: {
        // when we are in pending state
        // we define that the event is not allowed
        // we will define a forbiden transition for that
        on: {
          FETCH: undefined,
        },
        invoke: {
          src: "fetch",
          // handlers
          onDone: {
            target: "succes",
            // actions could be an array
            actions: "setData",
          },
          onError: {
            target: "error",
          },
        },
      },
      succes: {},
      error: {},
    },
  },
  {
    actions: {
      setData: assign({
        data: (_, event) => event.data,
      }),
    },
    // it is an object wuth key services
    services: {
      fetch: async () => {
        // we set the resolve and reject function arguments
        return new Promise((resolve, reject) => {
          // inside the body of the promise
          setTimeout(() => {
            const random = Math.random();
            // we can chen if random number
            // between 0 and 1
            // is greater than 0.5
            if (random > 0.5) {
              // if it is true we can resolve the promisse
              resolve(["A", "B", "C"]);
            } else {
              // if random is minor
              // we can reject it
              reject();
            }
          }, 1000);
        });
      },
    },
  }
);

export default function App() {
  const [current, send] = useMachine(fetchMachine);
  return (
    <div className="App">
      {/* for this porpuse */}

      {current.matches("succes") && (
        <ul>
          {current.context.data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {current.matches("pending") && <strong>Please wait...</strong>}
      {current.matches("error") && <strong>Oooops! error</strong>}

      <br />

      <button onClick={() => send("FETCH")}>fetch</button>
    </div>
  );
}
