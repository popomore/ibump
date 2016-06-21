'use strict';

var Bump = require('./bump');
var detectIndent = require('detect-indent');

/*
  Update version of the package
*/
module.exports = function(pkg, opt) {
  var indent = detectIndent(pkg).indent;
  pkg = JSON.parse(pkg);
  var bump = new Bump(pkg.version);
  opt = parseOpt(opt);
  if (opt.prerelease) {
    bump[opt.prerelease](opt.release);
  } else {
    bump[opt.release]();
  }
  pkg.version = bump.toString();

  return JSON.stringify(pkg, null, indent);
};

function parseOpt(opt) {
  var release = 'minor', prerelease;
  if (opt.major === true) {
    release = 'major';
  } else if (opt.patch === true) {
    release = 'patch';
  }

  if (opt.rc === true) {
    prerelease = 'rc';
  } else if (opt.beta === true) {
    prerelease = 'beta';
  } else if (opt.alpha === true) {
    prerelease = 'alpha';
  }
  return {
    release: release,
    prerelease: prerelease
  };
}
