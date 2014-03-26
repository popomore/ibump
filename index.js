var util = require('util');
var EventEmitter = require('events').EventEmitter;
var semver = require('semver');

module.exports = Bump;

function Bump (version) {
  if (semver.valid(version)) {
    this.version = split(version);
  } else {
    throw 'Version ' + version + ' not valid.';
  }
}

util.inherits(Bump, EventEmitter);

Bump.prototype.major = function() {
  this.version.major++;
  this.version.minor = 0;
  this.version.patch = 0;
  return this;
};

Bump.prototype.minor = function() {
  this.version.minor++;
  this.version.patch = 0;
  return this;
};

Bump.prototype.patch = function() {
  this.version.patch++;
  return this;
};

Bump.prototype.version = function(version) {
  if (semver.gt(version, this.toString())) {
    this.version = split(version);
  } else {
    this.emit('error', 'Version should greater than ' + this.toString());
  }
};

Bump.prototype.validate = function() {
  this.emit('error', 'Version not valid.');
};

Bump.prototype.toString = function() {
  return [
    this.version.major,
    this.version.minor,
    this.version.patch
  ].join('.');
};

function split(version) {
  var s = version.split('.');
  return {
    major: s[0],
    minor: s[1],
    patch: s[2]
  };
}
