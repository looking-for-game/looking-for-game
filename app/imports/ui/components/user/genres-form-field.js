import { Template } from 'meteor/templating';

Template.Genres_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

