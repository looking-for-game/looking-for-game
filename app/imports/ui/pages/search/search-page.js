import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/GameCollection';

const selectedGamesKey = 'selectedGames';

Template.Search_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedGamesKey, undefined);
});

Template.Search_Page.helpers({
  players() {
    // Initialize selectedGames to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedGamesKey)) {
      Template.instance().messageFlags.set(selectedGamesKey, _.map(Games.findAll(), game => game.name));
    }
    // Find all profiles with the currently selected games.
    const allProfiles = Profiles.findAll();
    const selectedGames = Template.instance().messageFlags.get(selectedGamesKey);
    return _.filter(allProfiles, player => _.intersection(player.games, selectedGames).length > 0);
  },

  /* interests() {
     return _.map(Interests.findAll(),
         function makeInterestObject(interest) {
           return {
             label: interest.name,
             selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
           };
         });
   }, */

  games() {

    return _.map(Games.findAll(),
        function makeInterestObject(games) {
          return {
            label: games.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGamesKey), games.name),
            numberOfProfiles: _.size(_.filter(_.map(Profiles.findAll(), player => {
               return _.contains(player.games, games.name)
            }), function(val){return val == true}))
          };
        });
  },
});

Template.Search_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Games.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedGamesKey, _.map(selectedOptions, (option) => option.value));
  },
});

