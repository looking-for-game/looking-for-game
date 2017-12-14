import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Games } from '/imports/api/game/GameCollection';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Games.getPublicationName());
});

Template.Home_Page.helpers({
  users() {
    return Profiles.findAll();
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
  routeUserName(friendName) {
    const friend = Profiles.findDoc(friendName);
    console.log(friend.username);
    return friend.username;
  },
});
