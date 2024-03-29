/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Players } from '/imports/api/player/PlayerCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/Game';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('PlayerCollection', function testSuite() {
    const interestName = 'Software Engineering';
    const interestDescription = 'Tools for software development';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const interests = [interestName];
    const games = [gameName];
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const title = 'Professor Computer Science';



    const github = 'http://github.com/philipjohnson';
    const facebook = 'http://github.com/philipjohnson';
    const instagram = 'http://github.com/philipjohnson';
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
      let docID = Players.define(defineObject);
      expect(Players.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Players.findDoc(docID);
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
      expect(function foo() { Players.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Players.dumpOne(docID);
      Players.removeIt(docID);
      expect(Players.isDefined(docID)).to.be.false;
      docID = Players.restoreOne(dumpObject);
      expect(Players.isDefined(docID)).to.be.true;
      Players.removeIt(docID);
    });

    it('#define (illegal interest)', function test() {
      const illegalInterests = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, interests: illegalInterests, picture, title,
        github, facebook, instagram };
      expect(function foo() { Players.define(defineObject2); }).to.throw(Error);
    });

    it('#define (illegal game)', function test() {
      const illegalGame = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, games: illegalGames, picture, title,
        github, facebook, instagram };
      expect(function foo() { Players.define(defineObject2); }).to.throw(Error);
    });
    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { firstName, lastName, username, bio, interests: duplicateInterests, picture, title,
        github, facebook, instagram };
      expect(function foo() { Players.define(defineObject3); }).to.throw(Error);
    });
    it('#define (duplicate games)', function test() {
      const duplicateGames = [gameName, gameName];
      const defineObject3 = { firstName, lastName, username, bio, interests: duplicateInterests, game: duplicateGames, picture, title,
        github, facebook, instagram };
      expect(function foo() { Players.define(defineObject3); }).to.throw(Error);
    });
  });
}

