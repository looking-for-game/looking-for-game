import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Players } from '/imports/api/player/PlayerCollection';

Template.Profile_Card.events({
  'click .magicCard'(event, instance) {
    event.preventDefault();
    //may need to change uhusername
    const name = instance.data.player.username;
    FlowRouter.go(`/${name}/public-profile`);
  },
 /* 'mouseover .magicCard'(event, instance) {
    event.preventDefault();
    console.log(instance);
  },
 / 'mouseleave .magicCard'(event) {
    event.preventDefault();
    console.log('mouseout');
  },*/
})