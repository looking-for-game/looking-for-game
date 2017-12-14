import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
// import { $ } from 'meteor/jquery';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Games } from '/imports/api/game/GameCollection';

Template.Public_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Games.getPublicationName());
});

Template.Public_Profile_Page.helpers({
  currentUser() {
    return _.find(Profiles.findAll(), function (player) {
      return player.username === FlowRouter.getParam('username');
    });
  },
  // Returns a list of friends alphabetically sorted, case-insensitive
  friends(current) {
    const friends = _.map(current.friends, function (friend) {
      return _.find(Profiles.findAll(), player => (player.handle === friend));
    });
    return _.sortBy(friends, friend => friend.handle.toLowerCase());
  },
  online(player) {
    return player.isOnline;
  },
  commendations(current) {
    return current.commendations;
  },
  count(commendation) {
    return commendation.count.length;
  },
  games(current) {
    const games = _.map(current.games, function (listedGame) {
      return _.find(Games.findAll(), game => (game.name === listedGame));
    });
    return _.sortBy(games, 'name');
  },
  tags(game) {
    return game.tags.sort();
  },
  // routeUserName(friendName) {
  //   const friend = Profiles.findDoc(friendName);
  //   console.log(friend.username);
  //   return friend.username;
  // },
});
