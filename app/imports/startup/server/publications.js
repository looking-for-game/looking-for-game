import { Interests } from '/imports/api/interest/InterestCollection';
import { Genres } from '/imports/api/genre/GenreCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Interests.publish();
Genres.publish();
Profiles.publish();
