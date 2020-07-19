'use strict';

const { ZigBeeLightDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');
const UbisysDeviceSetupCluster = require('./ubisysDeviceSetupCluster');
const { DeviceSetup } = require('./ubisysDeviceSetup');

// const OnOffBoundCluster = require('./onOffBoundCluster');

class Ubisys extends ZigBeeLightDevice {

  async onNodeInit({ zclNode, node }) {
    await super.onNodeInit({ zclNode, node });

    // TODO: Not working
    if (this.hasCapability('measure_power')) {
      const endpoint = this.getClusterEndpoint(CLUSTER.METERING);
      await this.registerCapability('measure_power', CLUSTER.METERING, {
        get: 'instantaneousDemand',
        report: 'instantaneousDemand',
        reportOpts: {
          configureAttributeReporting: {
            minInterval: 1,
            maxInterval: 0,
            minChange: 1,
          },
        },
        endpoint,
      });

      this.zclNode.endpoints[endpoint].clusters[CLUSTER.METERING.NAME]
        .on('attr.instantaneousDemand', value => {
          this.log('instantaneousDemand: ', value);
          this.setCapabilityValue('measure_power', value);
        });
    }

    // TODO: Add flows for inputs.

    this.log('Driver has been initied');
  }

  async onSettings({ oldSettings, newSettings, changedKeys }) {
    if (changedKeys.includes('device_configuration')) {
      /* TODO: DeviceSetup config, replace with writeAttributes() when Athom
       * adds support for ZCL data - type array.
       */
      try {
        const endpoint = this.getClusterEndpoint(UbisysDeviceSetupCluster);
        const seqNr = this.zclNode.endpoints[endpoint].clusters.ubisysDeviceSetup.nextSeqNr();

        // Payload for attribute 0x0001 InputActions
        const payload = Buffer.concat([Buffer.from([0x00, seqNr, 0x02, 0x01, 0x00, 0x48]),
          DeviceSetup[this.driver.id].Configurations[newSettings['device_configuration']]]);

        this.zclNode.sendFrame(endpoint, UbisysDeviceSetupCluster.ID, payload);
        // TODO: DeviceSetup config, handleFrame implementation is needed.
      } catch (err) {
        this.log('Error:', err);
      }
    }

    // TODO: Add inputConfigurations setting

    // TODO: Level Control Cluster - OnLevel setting

    // TODO: Ballast Configuration Cluster - MinLevel setting

    // TODO: Ballast Configuration Cluster - MaxLevel setting

    // TODO: Dimmer Setup Cluster - Mode setting setting

    // TODO: Device Setup Cluster - InputConfigurations setting
  }

}

module.exports = Ubisys;
