var telepactrf = require('../src/telepactrf');
var assert = require('assert');
var fs = require('fs');

function read(name) {
  return JSON.parse(fs.readFileSync('test/data/' + name + '.geojson'));
}

describe('Load', function() {
  it('telepac_1', function() {
    var geojson2018 = read('telepac_1_2018');
    var geojson = telepactrf(geojson2018, [

    ]);
    console.log(geojson);
  });
});
