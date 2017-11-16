/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/Game';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const interestName = 'GAME NAME HERE';
    const interestDescription = 'GAME DESCRIPTION HERE';
    const firstName = 'FIRSTNAME';
    const lastName = 'LASTNAME';
    const username = 'HANDLE';
    const bio = 'THIS IS WHERE A DESCRIPTION OF SOMETHING GOES';
    const interests = [interestName];
    const games = [gameName];
    const picture = 'http://#.jpg';
    const title = 'HANDLE OR SOMETHING';
    const github = '#';
    const facebook = '#';
    const instagram = '#';
    const defineObject = { firstName, lastName, username, bio, interests, games, picture, title, github, facebook, instagram };

    before(function setup() {
      removeAllEntities();
      // Define a sample interest.
      Interests.define({ name: interestName, description: interestDescription });
    });

    before(function setup() {
      removeAllEntities();
      // Define a sample game.
      Games.define({ name: gameName, description: gameDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Profiles.define(defineObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Profiles.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.bio).to.equal(bio);
      expect(doc.interests[0]).to.equal(interestName);
      expect(doc.games[0]).to.equal(gameName);
      expect(doc.picture).to.equal(picture);
      expect(doc.title).to.equal(title);
      expect(doc.github).to.equal(github);
      expect(doc.facebook).to.equal(facebook);
      expect(doc.instagram).to.equal(instagram);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Profiles.dumpOne(docID);
      Profiles.removeIt(docID);
      expect(Profiles.isDefined(docID)).to.be.false;
      docID = Profiles.restoreOne(dumpObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      Profiles.removeIt(docID);
    });

    it('#define (illegal interest)', function test() {
      const illegalInterests = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, interests: illegalInterests, picture, title,
        github, facebook, instagram };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it('#define (illegal game)', function test() {
      const illegalGame = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, games: illegalGames, picture, title,
        github, facebook, instagram };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { firstName, lastName, username, bio, interests: duplicateInterests, picture, title,
        github, facebook, instagram };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });

    it('#define (duplicate games)', function test() {
      const duplicateGames = [gameName, gameName];
      const defineObject3 = { firstName, lastName, username, bio, interests: duplicateInterests, game: duplicateGames, picture, title,
        github, facebook, instagram };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
  });
}

