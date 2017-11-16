import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Players } from '/imports/api/player/PlayerCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Players.removeAll();
}
