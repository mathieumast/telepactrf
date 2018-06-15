/**
 * telepactrf: transform telepac geojson.
 *
 * Copyright (c) 2018, Mathieu MAST/Groupama
 */

'use strict';

// La propriété est à ajouter avec une valeur
var addRuleType = 'add';

// La propriété est à supprimer
var removeRuleType = 'remove';

// La valeur de la propriété est à mofifier
var valueRuleType = 'value';

// La propriété est à renomer
var renameRuleType = 'rename';

function cloneGeojson(geojson) {
  if (geojson === null || typeof (obj) !== 'object') {
    return geojson;
  }
  var newGeojson = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(geojson, key)) {
      newGeojson[key] = cloneGeojson(geojson[key]);
    }
  }
  return newGeojson;
}

function telepactrf(geojson, rules) {
  if (geojson && rules) {
    var transformer = new telepactrfTransformer();
    transformer.setRules(rules);
    transformer.setGeojson(geojson);
    transformer.transform();
    return transformer.geojson;
  } else {
    return new telepactrfTransformer();
  }
}

function telepactrfTransformer() { }

telepactrfTransformer.prototype.setGeojson = function (geojson) {
  this.geojson = geojson;
}

telepactrfTransformer.prototype.setRules = function (rules) {
  this.rules = rules;
}

telepactrfTransformer.prototype.transform = function () {
  this.geojson = cloneGeojson(this.geojson);
  if (this.rules && Object.prototype.toString.call(this.rules) === '[object Array]') {
    this.transformGeojson(this.geojson);
  }
}

telepactrfTransformer.prototype.transformGeojson = function (subgeojson) {
  if (subgeojson) {
    if (subgeojson.type === 'Feature') {
      if (subgeojson.properties) {
        this.transformProperties(subgeojson.properties)
      }
    } else if (subgeojson.type === 'FeatureCollection') {
      if (subgeojson.features && Object.prototype.toString.call(subgeojson.features) === '[object Array]') {
        var i = 0;
        while (i < subgeojson.features.length) {
          this.transformGeojson(subgeojson.features[i])
          i++;
        }
      }
    }
  }
}

telepactrfTransformer.prototype.transformProperties = function (properties) {
  if (!properties) {
    return;
  }
  var i = 0;
  while (i < this.rules.length) {
    var rule = this.rules[i];
    if (rule && rule.type && rule.property) {
      // traitement de la règle de transformation "add"
      if (rule.type === addRuleType) {
        if (properties[rule.property] === undefined) {
          properties[rule.property] = rule.value;
        } else {
          console.error('rule "' + rule.type + '"is not correctly defined', rule);
        }
      }
      // traitement de la règle de transformation "remove"
      else if (rule.type === removeRuleType) {
        if (properties[rule.property] !== undefined) {
          delete properties[rule.property];
        } else {
          console.error('rule "' + rule.type + '"is not correctly defined', rule);
        }
      }
      // traitement de la règle de transformation "value"
      else if (rule.type === valueRuleType) {
        if (properties[rule.property] !== undefined) {
          properties[rule.property] = rule.value;
        } else {
          console.error('rule "' + rule.type + '"is not correctly defined', rule);
        }
      }
      // traitement de la règle de transformation "rename"
      else if (rule.type === renameRuleType) {
        if (properties[rule.property] !== undefined && properties[rule.name] === undefined) {
          properties[rule.name] = properties[rule.property];
          delete properties[rule.property];
        } else {
          console.error('rule "' + rule.type + '"is not correctly defined', rule);
        }
      } else {
        console.error('rule type "' + rule.type + '"is unknown', rule);
      }
    } else {
      console.error('rule is not correctly defined', rule);
    }
    i++;
  }
}

module.exports = telepactrf;
