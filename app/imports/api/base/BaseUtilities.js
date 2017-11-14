import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Games } from '/imports/api/game/GameCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Games.removeAll();
}
