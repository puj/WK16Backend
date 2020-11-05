export const rooms = {
  1: {
    coordinates: "0,0",
    description:
      "You find yourself in under a large archway opening into a cavern.  A sense of purpose fills you.",
    actions: [
      {
        type: "move",
        direction: "East",
        description:
          "A worn sign 'The Temple of *ech*igo'. Some of the letters are missing. An overgrown paved path leads to the East",
      },
    ],
  },
  2: {
    coordinates: "1,0",
    description: "It's warmer here.  Rays of light penetrate the the ceiling.",
    actions: [
      {
        type: "move",
        direction: "North",
        description:
          "A rickety bridge crosses a large cavern to the north. You see strange symbols '<' '>' '/' are engraved on the planks of the bridge.",
      },
      {
        type: "move",
        direction: "West",
        description: "You see a large archeway in the distance",
      },
    ],
  },
  3: {
    coordinates: "1,1",
    description:
      "The walls of the cavern seem to grow brighter and more colorful here. ",
    actions: [
      {
        type: "move",
        direction: "South",
        description:
          "The bridge somehow looks sturdier now.  Seeing it feels you with confidence.",
      },
      {
        type: "move",
        direction: "West",
        description:
          "A clear colorful pattern now marks the clearly cut stone pavers leading to the West",
      },
    ],
  },
  4: {
    coordinates: "0,1",
    description:
      "You emerge into a large, four-walled room with mechanical gadgets and bronze metal gizmos laying in a mess on the floor. They seem to have once been part of some larger moving mechanism.",
    actions: [
      {
        type: "move",
        direction: "North",
        description:
          "You hear faint sounds -- clicks and buzzing mechanical noises echoing on the other side of a door.",
      },
      {
        type: "move",
        direction: "East",
        description:
          "The colorful pathway to the East puts your mind at ease.  You seem to understand the intention of the one who created it.",
      },
    ],
  },
  5: {
    coordinates: "0,2",
    description: "[under construction]",
    actions: [
      {
        type: "move",
        direction: "South",
        description: "Javascript complete",
      },
    ],
  },
};
