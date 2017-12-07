import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Players } from '/imports/api/player/PlayerCollection';
import { Games } from '/imports/api/game/GameCollection';

Template.Public_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Players.getPublicationName());
  this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
});

Template.Public_Profile_Page.helpers({
  current() {
    return _.find(Players.findAll(), function (player) {
      return player.uhUsername === FlowRouter.getParam('username');
    });
  },
  friends(current) {
    const friends = _.map(current.friends, function (friend) {
      return _.find(Players.findAll(), player => (player.username === friend));
    });
    return _.sortBy(friends, 'username');
  },
  online(player) {
    return player.login;
  },
});
