 import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/GameCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class PlayerCollection extends BaseCollection {

  /**
   * Creates the Player collection.
   */
  constructor() {
    super('Player', new SimpleSchema({
      username: { type: String },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
      games: { type: Array, optional: true },
      'games.$': { type: String },
      battlenet: { type: String, optional: true },
      steam: { type: String, optional: true },
      xbox: { type: String, optional: true },
      friends: { type: Array, optional: true },
      'friends.$': { type: String },
      commendations: { type: Array, optional: true },
      'commendations.$': { type: Object },
      'commendations.$.tag': { type: String },
      'commendations.$.count': { type: Array },
      'commendations.$.count.$': { type: String },
      login: { type: Boolean, optional: true },
      uhUsername: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */

  define({ firstName = '', lastName = '', username, battlenet = '', steam = '', xbox = '', bio = '', interests = [], games = [], friends = [],
           commendations = [], login = '', uhUsername = '', picture = '' }) {
    // make sure required fields are OK.

    const checkPattern = { firstName: String, lastName: String, username: String, battlenet: String, steam: String, xbox: String, bio: String, login: Boolean, uhUsername: String, picture: String };

    check({ firstName, lastName, username, battlenet, steam, xbox, bio, login, uhUsername, picture }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);
    Games.assertNames(games);

    // Throw an error if there are duplicates in the passed interest names.
    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }

    if (games.length !== _.uniq(games).length) {
      throw new Meteor.Error(`${games} contains duplicates`);
    }

    if (friends.length !== _.uniq(friends).length) {
      throw new Meteor.Error(`${friends} contains duplicates`);
    }

    return this._collection.insert({ firstName, lastName, username, battlenet, steam, xbox, bio, interests, games, friends, commendations,
      login, uhUsername, picture });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const battlenet = doc.battlenet;
    const steam = doc.steam;
    const xbox = doc.xbox;
    const bio = doc.bio;
    const interests = doc.interests;
    const games = doc.games;
    const friends = doc.friends;
    const commendations = doc.commendations;
    const login = doc.login;
    const uhUsername = doc.uhUsername;
    const picture = doc.picture;
    return { firstName, lastName, username, bio, interests, games, friends, commendations, login, uhUsername, picture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Players = new PlayerCollection();
