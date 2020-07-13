'use strict';

const { Cluster, ZCLDataTypes } = require('zigbee-clusters');

const COMMANDS = {};

const ATTRIBUTES = {

  /* 0x0000: Capabilities (read-only)
   * Description:   A number of flags identifying the dimmer's capabilities, for example,
   *                if supports forward or reverse phase control..
   * Default:       0b0000 0000
   * Range:         0b0000 00xx
   * Bit  | Flag                    | Details
   * ---------------------------------------------------------------------------------------------
   * 0    | Forward Phase Control   | 1 = Dimmer supports AC forward phase control.
   * ---------------------------------------------------------------------------------------------
   * 1    | Reverse Phase Control   | 1 = Dimmer supports AC reverse phase control.
   * ---------------------------------------------------------------------------------------------
   * 2..4 | RFU                     | These bits are reserved for future use and must be
   *      |                         | written as 0 and ignored when read.
   * ---------------------------------------------------------------------------------------------
   * 5    | Reactance Discriminator | Dimmer is capable of measuring the reactance of the attached
   *      |                         | ballast good enough to distinguish inductive and capacitive
   *      |                         | loads and select the appropriate dimming technique
   *      |                         | accordingly.
   * ---------------------------------------------------------------------------------------------
   * 6    | Configurable Curve      | Dimmer is capable of replacing the built-in, default dimming
   *      |                         | curve, with a curve that better
   *      |                         | suits the attached ballast.
   * ---------------------------------------------------------------------------------------------
   * 7    | Overload detection      | Dimmer is capable of detecting an output overload and
   *      |                         | shutting the output off to prevent damage to the dimmer.
   */
  capabilities: {
    id: 0,
    type: ZCLDataTypes.map8('forwardPhaseControl', 'reversePhaseControl', null, null, null, 'reactanceDiscriminator', 'configurableCurve', 'overloadDetection'),
  },

  /* 0x0001: Status (read-only)
   * Description:   A number of flags, which provide insight into the dimmer�s operational status
   *
   * Bit  | Flag                    | Details
   *      |                         |
   * ---------------------------------------------------------------------------------------------
   * 0    | Forward Phase Control   | Dimmer is currently operating in AC forward phase mode.
   * ---------------------------------------------------------------------------------------------
   * 1    | Reverse Phase Control   | Dimmer is currently operating in AC reverse phase mode.
   * ---------------------------------------------------------------------------------------------
   * 2    | Operational             | Dimmer is operational.
   *      |                         | i.e. does output a potentially phase-cut voltage. Otherwise,
   *      |                         | the dimmer will only switch the output between fully on or
   *      |                         | fully off. It is set as soon as the dimmer has sufficient
   *      |                         | confidence that the appropriate dimming mode was selected.
   * ---------------------------------------------------------------------------------------------
   * 3    | Overload                | The output is currently turned off, because the dimmer
   *      |                         | has detected an overload.
   * ---------------------------------------------------------------------------------------------
   * 4..5 | RFU                     | Reserved for future use. Set to 0 when writing,
   *      |                         | ignore when reading.
   * ---------------------------------------------------------------------------------------------
   * 6    | Capacitive Load         | dimmer's reactance discriminator has detected a
   *      |                         | capacitive load.
   * ---------------------------------------------------------------------------------------------
   * 7    | Inductive Load          | dimmer's reactance discriminator has detected an
   *      |                         | inductive load.
   */
  status: {
    id: 1,
    type: ZCLDataTypes.map8('forwardPhaseControl', 'reversePhaseControl', 'operational', 'overload', null, null, 'capacitiveLoad', 'inductiveLoad'),
  },

  /* 0x0002: Mode (persistent, preserved, read-write)
   * Description:   Specifies the mode of operation, either automatic, forced forward or
   *                reverse phase control.
   *
   * Bit  | Flag                    | Details
   * ---------------------------------------------------------------------------------------------
   * 0..1 | Phase Control           | Specifies the mode of operation:
   *      |                         | 00b: Automatically select the appropriate dimming technique
   *      |                         | 01b: Always use forward phase control (leading edge, L)
   *      |                         | 02b: Always use reverse phase control (trailing edge, C/R)
   *      |                         | 11b: Reserved. Do not use.
   * ---------------------------------------------------------------------------------------------
   * 2..7 | RFU                     | These bits are reserved for future use. Write as 0, ignore
   *      |                         | when reading.

   */
  mode: {
    id: 2,
    type: ZCLDataTypes.map8('phaseControl', 'phaseControl', null, null, null, null, null, null),
  },

};

class UbisysDimmerSetupCluster extends Cluster {

  static get ID() {
    return 64513; // 0xFC01
  }

  static get NAME() {
    return 'dimmerSetup';
  }

  static get ATTRIBUTES() {
    return ATTRIBUTES;
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(UbisysDimmerSetupCluster);

module.exports = UbisysDimmerSetupCluster;
