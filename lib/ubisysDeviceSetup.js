'use strict';

/* eslint-disable no-unused-vars */
// FUTURE: Attribute definitions for custom device setups.
const INPUTACTION = {
  INPUT_AND_OPTIONS: {
    PRIMARY_BUTTON: 0x00,
    SECONDARY_BUTTON: 0x01,
  },
  TRANSITION: {
    HAS_ALTERNATE: 0b1000000,
    ALTERNATE: 0b01000000,
    INITIAL_STATE: {
      IGNORE: 0,
      PRESSED: 0b00000100,
      KEPT_PRESSED: 0b00001000,
      RELEASED: 0b00001100,
    },
    FINAL_STATE: {
      IGNORE: 0,
      PRESSED: 0b00000001,
      KEPT_PRESSED: 0b00000010,
      RELEASED: 0b00000011,
    },
  },
};
/* eslint-enable no-unused-vars */

const Configurations = {

  // D1, D1-R: DIM, 1 button, alternating up/down, rate = 50 (default)
  DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2_3: Buffer.from([
    0x41, 0x08, 0x00, 0x06, 0x00, 0x07, 0x02, 0x06,
    0x00, 0x02, 0x08, 0x00, 0x86, 0x02, 0x08, 0x00,
    0x05, 0x00, 0x32, 0x08, 0x00, 0xc6, 0x02, 0x08,
    0x00, 0x05, 0x01, 0x32, 0x06, 0x00, 0x0B, 0x02,
    0x08, 0x00, 0x07, 0x06, 0x01, 0x07, 0x03, 0x06,
    0x00, 0x02, 0x08, 0x01, 0x86, 0x03, 0x08, 0x00,
    0x05, 0x00, 0x32, 0x08, 0x01, 0xc6, 0x03, 0x08,
    0x00, 0x05, 0x01, 0x32, 0x06, 0x01, 0x0b, 0x03,
    0x08, 0x00, 0x07,
  ]),
  // D1, D1-R: DIM, Two buttons up/down, rate = 50
  DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2: Buffer.from([
    0x41, 0x06, 0x00, 0x06, 0x00, 0x07, 0x02, 0x06,
    0x00, 0x01, 0x08, 0x00, 0x06, 0x02, 0x08, 0x00,
    0x05, 0x00, 0x32, 0x06, 0x00, 0x0b, 0x02, 0x08,
    0x00, 0x07, 0x06, 0x01, 0x07, 0x02, 0x06, 0x00,
    0x00, 0x08, 0x01, 0x06, 0x02, 0x08, 0x00, 0x05,
    0x01, 0x32, 0x06, 0x01, 0x0b, 0x002, 0x08, 0x00,
    0x07,
  ]),
  // C4: TOGGLE, 4 push-buttons (default)
  ON_OFF_4_SHORT_INPUTS_TOGGLE_ENDPOINT_1_2_3_4: Buffer.from([
    0x41, 0x04, 0x00, 0x06, 0x00, 0x0d, 0x01, 0x06,
    0x00, 0x02, 0x06, 0x01, 0x0d, 0x02, 0x06, 0x00,
    0x02, 0x06, 0x02, 0x0d, 0x03, 0x06, 0x00, 0x02,
    0x06, 0x03, 0x0d, 0x04, 0x06, 0x00, 0x02,
  ]),
  /*
   * SHUTTER Configuration: Dual push-button operation (default)
   * Description:
   *  Dual push-button operation (momentary, one stable position). A short press will move
   *  up/down and stop when released, while a long press will move up/down without stopping
   *  before the fully open or fully closed position is reached, respectively.
   *  This is particularly useful for lift & tilt blinds, but also generally suitable
   *  for all kinds of attached devices.
   * Devices:
   *  J1 (default)
   *  J1-R
   */
  WINDOW_COVERING_2_SHORT_LONG_INPUTS_MOVE_STOP_ENDPOINT_2: Buffer.from([
    0x41, 0x01, 0x00, 0x06, 0x00, 0x0d, 0x02, 0x02,
    0x01, 0x00, 0x06, 0x00, 0x07, 0x02, 0x02, 0x01,
    0x02, 0x06, 0x01, 0x0d, 0x02, 0x02, 0x01, 0x01,
    0x06, 0x01, 0x07, 0x02, 0x02, 0x01, 0x02,
  ]),
  /* SHUTTER Configuration: Stationary switches
   * Description:
   *  Stationary switches are connected to the inputs, the shutters moves as long as either
   *  switch is turned on.
   * Devices:
   *  J1
   *  J1-R
   */
  WINDOW_COVERING_2_LONG_INPUTS_MOVE_STOP_ENDPOINT_2: Buffer.from([
    0x41, 0x04, 0x00, 0x06, 0x00, 0x0d, 0x02, 0x02,
    0x01, 0x00, 0x06, 0x00, 0x03, 0x02, 0x02, 0x01,
    0x02, 0x06, 0x01, 0x0d, 0x02, 0x02, 0x01, 0x01,
    0x06, 0x01, 0x03, 0x02, 0x02, 0x01, 0x02,
  ]),
  /* ON/OFF Configuration: Rocker switch (stationary, two stable positions)
   * Description:
   *  TODO: Add description
   * Devices:
   *  S1 (default)
   * */
  ON_OFF_1_BISTABLE_INPUT_TOGGLE_ENDPOINT_2: Buffer.from([
    0x41, 0x02, 0x00, 0x06, 0x00, 0x0d, 0x02, 0x06,
    0x00, 0x02, 0x06, 0x00, 0x03, 0x02, 0x06, 0x00,
    0x02,
  ]),
  /* ON/OFF Configuration: Push-buttons (momentary, one stable position)
   * Description:
   *  TODO: Add description
   * Devices:
   *  S1-R (default)
   */
  ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_2_3: Buffer.from([
    0x41, 0x02, 0x00, 0x06, 0x00, 0x0d, 0x02, 0x06,
    0x00, 0x02, 0x06, 0x01, 0x0d, 0x03, 0x06, 0x00,
    0x02,
  ]),
  /* ON/OFF Configuration: Push-buttons (momentary, one stable position)
   * Description:
   *  TODO: Add description
   * Devices:
   *  S2 (default)
   *  S2-R (default)
   */
  ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_3_4: Buffer.from([
    0x41, 0x02, 0x00, 0x06, 0x00, 0x0d, 0x03, 0x06,
    0x00, 0x02, 0x06, 0x01, 0x0d, 0x04, 0x06, 0x00,
    0x02,
  ]),

};

const Devices = {
  D1_5503: {
    Configurations: {
      DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2_3:
        Configurations.DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2_3,

      DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2:
        Configurations.DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2,
    },
  },
  D1R_5503: {
    Configurations: {
      DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2_3:
        Configurations.DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2_3,

      DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2:
        Configurations.DIM_2_SHORT_LONG_INPUTS_MOVE_ON_OFF_ENDPOINT_2,
    },
  },
  S1_5501: {
    Configurations: {
      ON_OFF_1_BISTABLE_INPUT_TOGGLE_ENDPOINT_2:
        Configurations.ON_OFF_1_BISTABLE_INPUT_TOGGLE_ENDPOINT_2,
    },
  },
  S1R_5501: {
    Configurations: {
      ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_2_3:
        Configurations.ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_2_3,
    },
  },
  S2_5502: {
    Configurations: {
      ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_3_4:
        Configurations.ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_3_4,
    },
  },
  S2R_5502: {
    Configurations: {
      ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_3_4:
        Configurations.ON_OFF_2_SHORT_INPUTS_TOGGLE_ENDPOINT_3_4,
    },
  },
};

const DeviceSetup = Devices;

module.exports = { DeviceSetup };
