import CoreServices from './coreServices';
import { VACANCY_LISTING } from '../constants';
import axios from 'axios';

class VacancyListingService extends CoreServices {
  async NOTIFY_USERS(payload) {
    try {
      await axios.post(
        `${this.apiEnpoint}${this.service}/notify-user`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
    } catch (error) {
      console.log(error);
      return { error: this.getErrorMessage(error) };
    }
  }
}

export default new VacancyListingService(VACANCY_LISTING.BASE);
