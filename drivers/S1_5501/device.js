'use strict';

const Ubisys = require('../../lib/ubisys.js');

class S1_5501 extends Ubisys {

  config = {
    input: [
      /*
      {
        endpoint: 2,
        name: 'switch1',
      },
      */
      /*
      {
        endpointId: 2,
        name: 'switch2',
        onOff: true,
        levelControl: true,
      },
      */
    ],
    metering: [
      {
        endpointId: 3,
      },
    ],
  };

}

module.exports = S1_5501;
