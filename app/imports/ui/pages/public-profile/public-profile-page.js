import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
// import { $ } from 'meteor/jquery';
import { Players } from '/imports/api/player/PlayerCollection';
import { Games } from '/imports/api/game/GameCollection';

Template.Public_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Players.getPublicationName());
  this.subscribe(Games.getPublicationName());
});

Template.Public_Profile_Page.helpers({
  currentUser() {
    return _.find(Players.findAll(), function (player) {
      return player.uhUsername === FlowRouter.getParam('username');
    });
  },
  // Returns a list of friends alphabetically sorted, case-insensitive
  friends(current) {
    const friends = _.map(current.friends, function (friend) {
      return _.find(Players.findAll(), player => (player.username === friend));
    });
    return _.sortBy(friends, function (friend) {
      return friend.username.toLowerCase();
    });
  },
  online(player) {
    return player.login;
  },
  commendations(current) {
    return current.commendations;
  },
  count(commendation) {
    return commendation.count.length;
  },
});
