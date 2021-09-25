import CoreServices from './coreServices';
import { REAL_ESTATE_LISTINGs } from '../constants';
import axios from 'axios';

class RealEstateListingServices extends CoreServices {
  async NOTIFY_USERS(payload) {
    console.log(payload);
    console.log(`${this.apiEnpoint}${this.service}/notify-user`);
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

export default new RealEstateListingServices(REAL_ESTATE_LISTINGs.BASE);
