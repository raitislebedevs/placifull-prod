import CoreServices from './coreServices';
import { TRANSPORT_LISTING } from '../constants';

class TransportListingService extends CoreServices {
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

export default new TransportListingService(TRANSPORT_LISTING.BASE);
