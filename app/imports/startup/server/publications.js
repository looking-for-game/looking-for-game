import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/GameCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Players } from '/imports/api/player/PlayerCollection';

Interests.publish();
Games.publish();
Profiles.publish();
Players.publish();
