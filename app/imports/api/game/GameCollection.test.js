import { Games } from '/imports/api/game/GameCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('GameCollection', function testSuite() {
    const name = 'MMORPG';
    const description = 'Massively Multiplayer Online Role Playing Games';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Games.define(defineObject);
      expect(Games.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Games.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Games.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Game.
      const dumpObject = Games.dumpOne(docID);
      Games.removeIt(docID);
      expect(Games.isDefined(docID)).to.be.false;
      docID = Games.restoreOne(dumpObject);
      expect(Games.isDefined(docID)).to.be.true;
      Games.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Games.define(defineObject);
      expect(Games.isDefined(docID)).to.be.true;
      const docID2 = Games.findID(name);
      expect(docID).to.equal(docID2);
      Games.findIDs([name, name]);
      Games.removeIt(docID);
    });
  });
}

