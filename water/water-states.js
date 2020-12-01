// https://codesandbox.io/
const waterMachine = Machine({
  id: "water",
  initial: "liquid",
  states: {
    ice: {
      // EVENTS
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
