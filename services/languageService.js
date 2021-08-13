import CoreServices from './coreServices';
import { LANGUAGES } from '../constants';
import axios from 'axios';

class LanguageService extends CoreServices {
  async LOCAL() {
    try {
      const { data } = await axios.get('https://geolocation-db.com/json/');
      return data;
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }
}

export default new LanguageService(LANGUAGES.BASE);
