'use strict';

const { BoundCluster } = require('zigbee-clusters');

class OnOffBoundCluster extends BoundCluster {

  constructor({ onSetOn, onSetOff }) {
    super();
    this._onSetOn = onSetOn;
    this._onSetOff = onSetOff;
  }

  setOn(payload) {
    this._onSetOn(payload);
  }

  setOff(payload) {
    this._onSetOff(payload);
  }

}

module.exports = OnOffBoundCluster;
