import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Players } from '/imports/api/player/PlayerCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/GameCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Players.removeAll();
  Games.removeAll();
}
