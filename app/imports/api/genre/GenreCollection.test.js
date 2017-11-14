import { Genres } from '/imports/api/genre/GenreCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('GenreCollection', function testSuite() {
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
      let docID = Genres.define(defineObject);
      expect(Genres.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Genres.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Genres.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Genre.
      const dumpObject = Genres.dumpOne(docID);
      Genres.removeIt(docID);
      expect(Genres.isDefined(docID)).to.be.false;
      docID = Genres.restoreOne(dumpObject);
      expect(Genres.isDefined(docID)).to.be.true;
      Genres.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Genres.define(defineObject);
      expect(Genres.isDefined(docID)).to.be.true;
      const docID2 = Genres.findID(name);
      expect(docID).to.equal(docID2);
      Genres.findIDs([name, name]);
      Genres.removeIt(docID);
    });
  });
}

