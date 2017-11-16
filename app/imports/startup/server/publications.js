import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Players } from '/imports/api/player/PlayerCollection';

Interests.publish();
Profiles.publish();
Players.publish();
