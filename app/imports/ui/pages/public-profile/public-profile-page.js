import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
// import { _ } from 'meteor/underscore';
import { Players } from '/imports/api/player/PlayerCollection';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Players.getPublicationName());
  this.messageFlags = new ReactiveDict();
});
