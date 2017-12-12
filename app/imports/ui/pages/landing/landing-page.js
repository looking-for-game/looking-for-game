import { Template } from 'meteor/templating';
import { Players } from '/imports/api/player/PlayerCollection';

Template.Landing_Page.onCreated(function onCreated() {
  console.log('This is working')
  this.subscribe(Players.getPublicationName());
});
