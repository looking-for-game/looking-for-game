import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
// import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
});
