'use strict';

var BLEDeviceInformation = source("device-information");

var Cylon = require('cylon');

describe("Cylon.Drivers.BLE.BLEDeviceInformation", function() {
  var driver;

  beforeEach(function() {
    driver = new BLEDeviceInformation({
      device: { connection: {} }
    })
  });

  it("is a subclass of Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(BLEDeviceInformation);
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
  });

  describe("#constructor", function() {
    it("sets @serviceId to the passed serviceId", function() {
      driver = new BLEDeviceInformation({
        device: { connection: {} },
        extraParams: { serviceId: 'serviceId' }
      });

      expect(driver.serviceId).to.be.eql('serviceId');
    });

    it("sets @serviceId to the '180f' by default", function() {
      expect(driver.serviceId).to.be.eql('180a');
    });
  });

  describe("#start", function() {
    it("triggers the callback", function() {
      var callback = spy();
      driver.start(callback);
      expect(callback).to.be.called;
    });
  });

  describe("#halt", function() {
    it("triggers the callback", function() {
      var callback = spy();
      driver.halt(callback);
      expect(callback).to.be.called;
    });
  });

  describe("#getModelNumber", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver._getServiceCharacteristic = stub().yields(null, 'value')
    });

    it("reads the service characteristic from the device", function() {
      driver.getModelNumber(callback);
      expect(driver._getServiceCharacteristic).to.be.calledWith("2a24");
      expect(callback).to.be.calledWith(null, 'value');
    });
  });

  describe("#_getServiceCharacteristic", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.connection.readServiceCharacteristic = spy();
    });

    it("calls #readServiceCharacteristic on the connection", function() {
      driver._getServiceCharacteristic("hello", callback);
      expect(driver.connection.readServiceCharacteristic).to.be.calledWith(
        "180a",
        "hello",
        callback
      );
    });
  });
});
