(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.telepactrf = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * telepactrf: transform telepac geojson.
 *
 * Copyright (c) 2018, Mathieu MAST/Groupama
 */

'use strict';

// La propriété est à supprimer
var removeRuleType = 'remove';

// La propriété est à renomer
var renameRuleType = 'rename';

// La propriété est à ajouter
var addRuleType = 'add';


if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

function cloneGeojson(geojson) {
  if (geojson === null || typeof(obj) !== 'object') {
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

function telepactrfTransformer() {}

telepactrfTransformer.prototype.setGeojson = function(geojson) {
  this.geojson = geojson;
}

telepactrfTransformer.prototype.setRules = function(rules) {
  this.rules = rules;
}

telepactrfTransformer.prototype.transform = function() {
  this.geojson = cloneGeojson(this.geojson);
  if (this.rules && Object.prototype.toString.call(this.rules) === '[object Array]') {
    this.transformGeojson(this.geojson);
  }
}

telepactrfTransformer.prototype.transformGeojson = function(geojson) {
  if (geojson) {
    if (geojson.type === 'Feature') {
      if (geojson.properties) {
        this.transformProperties(geojson.properties)
      }
    } else if (geojson.type === 'FeatureCollection') {
      if (geojson.features && Object.prototype.toString.call(geojson.features) === '[object Array]') {
        var i = 0;
        while (i < this.geojson.features) {
          this.transformGeojson(geojson.features[i])
          i++;
        }
      }
    }
  }
}

telepactrfTransformer.prototype.transformProperties = function(properties) {
    /*
    var i = 0;
    while (i < this.rules.length) {
      var rule = this.rules[i];
      // Todo: traitement de la règle de transformation
      i++;
    }*/
}

module.exports = telepactrf;

},{}]},{},[1])(1)
});
