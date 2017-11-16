import { Template } from 'meteor/templating';

Template.Games_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

