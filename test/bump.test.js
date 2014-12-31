'use strict';

require('should');
var Bump = require('../lib/bump');

describe('bump', function() {

  it('should throw when invalid version', function() {
    (function() {
      new Bump('aaaa');
    }).should.throw('Version aaaa not valid.');
  });

  it('should bump version', function(){
    new Bump('1.0.0')
    .major()
    .major()
    .toString()
    .should
    .eql('3.0.0');

    new Bump('1.0.0')
    .patch()
    .patch()
    .toString()
    .should
    .eql('1.0.2');

    new Bump('1.0.0')
    .patch()
    .patch()
    .minor()
    .toString()
    .should
    .eql('1.1.0');

    new Bump('1.0.0')
    .patch()
    .minor()
    .major()
    .toString()
    .should
    .eql('2.0.0');
  });

  it('should bump prerelease', function() {
    new Bump('1.0.0')
    .alpha()
    .toString()
    .should
    .eql('1.0.1-alpha.0');

    new Bump('1.0.0')
    .patch()
    .alpha()
    .toString()
    .should
    .eql('1.0.2-alpha.0');

    new Bump('1.0.0')
    .alpha('patch')
    .toString()
    .should
    .eql('1.0.1-alpha.0');

    new Bump('1.0.0')
    .rc('minor')
    .toString()
    .should
    .eql('1.1.0-rc.0');

    new Bump('1.0.0')
    .minor()
    .rc()
    .toString()
    .should
    .eql('1.1.1-rc.0');

    new Bump('1.0.0')
    .alpha('major')
    .toString()
    .should
    .eql('2.0.0-alpha.0');

    new Bump('1.0.0')
    .major()
    .alpha()
    .toString()
    .should
    .eql('2.0.1-alpha.0');

    new Bump('1.0.0-alpha')
    .alpha()
    .toString()
    .should
    .eql('1.0.0-alpha.0');

    new Bump('1.0.0-alpha')
    .alpha()
    .alpha()
    .toString()
    .should
    .eql('1.0.0-alpha.1');

    new Bump('1.0.0-alpha.0')
    .alpha()
    .toString()
    .should
    .eql('1.0.0-alpha.1');

    new Bump('1.0.0-alpha.1')
    .beta()
    .toString()
    .should
    .eql('1.0.0-beta.0');

    new Bump('1.0.0-alpha.1')
    .minor()
    .toString()
    .should
    .eql('1.0.0');

    new Bump('1.0.0-alpha.1')
    .patch()
    .toString()
    .should
    .eql('1.0.0');

    new Bump('1.0.0')
    .pre()
    .toString()
    .should
    .eql('1.0.0-0');

    new Bump('1.0.0')
    .patch()
    .pre()
    .toString()
    .should
    .eql('1.0.1-0');

    new Bump('1.0.0')
    .patch()
    .pre('dev')
    .toString()
    .should
    .eql('1.0.1-dev.0');

    new Bump('1.0.0-alpha.1')
    .pre()
    .toString()
    .should
    .eql('1.0.0-alpha.2');
  });
});
