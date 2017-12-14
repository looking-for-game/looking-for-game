import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection';

/* eslint-disable no-console */

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    console.log(user);
    const username = user.services.cas.id;
    if (!Profiles.isDefined(username)) {
      console.log(username);

      Profiles.define({ username : username, handle : '',isOnline : true});
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
