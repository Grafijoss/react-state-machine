// DELAYS
// are used fos automatic transicions

const DELAY = {
  states: {
    delayed: {
      after: {
        // are defined with special AFTER property
        1000: {
          target: "done",
        },
      },
    },
    done: {
      type: "final",
    },
  },
};

// events can also delayed

const DELAY_EVENTS = {
  states: {
    init: {
      entry: send("DONE", {
        // send is an special creator from XSTATE
        id: "delayedEvent",
        delay: 1000,
      }),
      on: {
        DONE: {
          target: "ready",
        },
      },
    },
    ready: {
      type: "final",
    },
  },
};

//DELAYS can be defined outside of the machine

const OUTSIDE_DELAYS = () => (
  {
    states: {
      ready: {
        after: {
          DELAY: {},
        },
      },
    },
  },
  {
    delays: {
      DELAY: 2000, // custom name
    },
  }
);
