'use strict';

var semver = require('semver');
var debug = require('debug')('ibump');

module.exports = Bump;

function Bump(version, loose){
  if (!(this instanceof Bump)) {
    return new Bump(version, loose);
  }

  var _semver = semver.parse(version, loose);
  if (_semver) {
    this._semver = _semver;
    debug('Initial version %s', _semver.version);
  } else {
    throw new Error('Version ' + version + ' not valid.');
  }
}

var proto = Bump.prototype;

proto.major = function() {
  this._inc('major');
  return this;
};

proto.minor = function() {
  this._inc('minor');
  return this;
};

proto.patch = function() {
  this._inc('patch');
  return this;
};

proto.alpha = function(release) {
  return this._pre('alpha', release || 'patch');
};

proto.beta = function(release) {
  return this._pre('beta', release || 'patch');
};

proto.rc = function(release) {
  return this._pre('rc', release || 'patch');
};

proto.pre = function(identifier) {
  return this._pre(identifier);
};

proto._pre = function(identifier, release) {
  if (['major', 'minor', 'patch'].indexOf(release) === -1 ||
    this._semver.prerelease.length > 0) {
    release = '';
  }
  this._inc('pre' + release, identifier);
  return this;
};

proto._inc = function(release, identifier) {
  var originVersion = this._semver.version;
  this._semver.inc(release, identifier);
  debug('Version: %s => %s, release: %s, identifier: %s, ',
    originVersion, this._semver.version, release, identifier);
};

proto.toString = function() {
  return this._semver.toString();
};
