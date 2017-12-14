import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
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
    return player.isOnline;
  },
  commendations(current) {
    return current.commendations;
  },
  platform(platform) {
    if(platform) {
      return true;
    }
    return false;
  },
  routeUserName(friendName) {
    const friend = Profiles.findDoc(friendName);
    //console.log(friend.username);
    return friend.username;
  },
});
