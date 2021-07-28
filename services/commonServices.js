import axios from 'axios';
import { COMMON } from '../constants';
import CoreServices from './coreServices';

class CommonServices extends CoreServices {
  async SEND_EMAIL(payload) {
    try {
      let { data } = await axios.post(
        `${this.apiEnpoint}${COMMON.EMAIL}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }
}

export default new CommonServices();
