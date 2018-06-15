var telepactrf = require('../src/telepactrf');
var assert = require('assert');
var fs = require('fs');

function read(name) {
  return JSON.parse(fs.readFileSync('test/data/' + name + '.geojson'));
}

describe('Load', function () {
  it('test', function () {
    var geojsonTest = read('geojson_test');
    var geojsonResult = telepactrf(geojsonTest, [
      {
        "type": "add",
        "property": "COMMERC",
        "value": "0"
      }, {
        "type": "add",
        "property": "AIDEBIO",
        "value": ""
      }, {
        "type": "add",
        "property": "MAEC1_CODE",
        "value": ""
      }, {
        "type": "add",
        "property": "MAEC1CIBLE",
        "value": "0"
      }, {
        "type": "add",
        "property": "MAEC2_CODE",
        "value": ""
      }, {
        "type": "add",
        "property": "MAEC2CIBLE",
        "value": "0"
      }, {
        "type": "add",
        "property": "MAEC3_CODE",
        "value": ""
      }, {
        "type": "add",
        "property": "MAEC3CIBLE",
        "value": "0"
      }, {
        "type": "remove",
        "property": "SURF"
      },
      {
        "type": "remove",
        "property": "RECONV_PP"
      },
      {
        "type": "remove",
        "property": "CIBLE_SHP"
      },
      {
        "type": "remove",
        "property": "MAEC_PRV"
      },
      {
        "type": "value",
        "property": "NUMERO_PA",
        "value": "0"
      },
      {
        "type": "rename",
        "property": "NUMERO_I",
        "name": "NUMERO_SI"
      },
      {
        "type": "rename",
        "property": "NUMERO_P",
        "name": "NUMERO"
      }
    ]);
    var geojsonExpected = read('geojson_test_expected');
    assert.deepEqual(geojsonResult, geojsonExpected);
  });
});
