import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Genre */

/**
 * Represents a specific gaming genre, such as "MMO", "RTS", "".
 * @extends module:Base~BaseCollection
 */
class GenreCollection extends BaseCollection {

  /**
   * Creates the Genre collection.
   */
  constructor() {
    super('Genre', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Genre.
   * @example
   * Genres.define({ name: 'MMO', 'RTS',
   *                    description: 'Massively Multiplayer Online' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the genre definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Genre`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Genre name corresponding to the passed genre docID.
   * @param genreID An genre docID.
   * @returns { String } An genre name.
   * @throws { Meteor.Error} If the genre docID cannot be found.
   */
  findName(genreID) {
    this.assertDefined(genreID);
    return this.findDoc(genreID).name;
  }

  /**
   * Returns a list of Genre names corresponding to the passed list of Genre docIDs.
   * @param genreIDs A list of Genre docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(genreIDs) {
    return genreIDs.map(genreID => this.findName(genreID));
  }

  /**
   * Throws an error if the passed name is not a defined Genre name.
   * @param name The name of an genre.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Genre names.
   * @param names An array of (hopefully) Genre names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Genre name, or throws an error if it cannot be found.
   * @param { String } name An genre name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Genre.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Genre names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of genre names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Genre name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Genre docID in a format acceptable to define().
   * @param docID The docID of an Genre.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Genres = new GenreCollection();
