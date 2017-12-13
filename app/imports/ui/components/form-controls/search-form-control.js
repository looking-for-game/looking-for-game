import { Template } from 'meteor/templating';

Template.Search_Form_Control.onRendered(function onRendered() {
  this.$('select.dropdown').dropdown({placeholder:'All Games'});
});
