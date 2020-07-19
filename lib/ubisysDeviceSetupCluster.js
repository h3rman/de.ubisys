'use strict';

const { Cluster, ZCLDataTypes } = require('zigbee-clusters');

const COMMANDS = {};

/* eslint-disable no-unused-vars */
/* TODO: DeviceSetup config, replace with writeAttributes() when Athom
 * adds support for ZCL data - type array.
 */
const ATTRIBUTES = {
  /* 0x0000: InputConfigurations (persistent, preserved, read-write)
     * Description:   This array of 8-bit data holds exactly one entry per physical device input and
     *                allows disabling the input or inverting the "normal" signal level
     *                (normally closed vs. normally open).
     *
     * Bit  | Flag                    | Details
     * ---------------------------------------------------------------------------------------------
     * 0..5 | RFU                     | Bits are reserved for future use and must be written as 0
     *      |                         | and ignored when read.
     * ---------------------------------------------------------------------------------------------
     * 6    | Invert                  | Determines the "active" level. The default is active-high,
     *      |                         | meaning that a high voltage level (within 10% of the supply
     *      |                         | voltage) translates to an active input, and a low voltage
     *      |                         | level translates to in inactive signal. If this bit is set,
     *      |                         | the input is "active-low", instead. For normally open
     *      |                         | circuits, leave this bit clear; for normally closed
     *      |                         | circuits make sure this bit is set.
     * ---------------------------------------------------------------------------------------------
     * 7    | Disable                 | Input is disabled.
     *      |                         |
     */
  inputConfigurations: {
    id: 0,
    type: null,
  },
  /* TODO: DeviceSetup config, replace with writeAttributes() when Athom
* adds support for ZCL data - type array.
*/
  /* 0x0001: InputActions (persistent, preserved, read-write)
     * Description:   This array of raw data strings maps physical inputs to application endpoints
     *                on the device (for example, an on/off switch application) and translates level
     *                changes to appropriate cluster commands (e.g. on/off/toggle or move/stop).
     *
     *
     */
  inputActions: {
    id: 1,
    type: ZCLDataTypes.int16,
  },
};
/* eslint-enable no-unused-vars */

class UbisysDeviceSetupCluster extends Cluster {

  static get ID() {
    return 64512; // 0xFC00
  }

  static get NAME() {
    return 'ubisysDeviceSetup';
  }

  static get ATTRIBUTES() {
    // return ATTRIBUTES;
    return {};
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(UbisysDeviceSetupCluster);

module.exports = UbisysDeviceSetupCluster;
