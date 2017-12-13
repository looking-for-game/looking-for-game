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
  friends(current) {
    const friends = _.map(current.friends, function (friend) {
      return _.find(Profiles.findAll(), player => (player.handle === friend));
    });
    return _.sortBy(friends, 'username');
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
