import CoreServices from './coreServices';
import { FILE } from '../constants';
import axios from 'axios';

class FileServices extends CoreServices {
  async UPLOAD_FILE(payload) {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + this.getToken(),
    };

    try {
      let { data } = await axios.post(
        `${this.apiEnpoint}${FILE.BASE}`,
        payload,
        {
          headers: headers,
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async DELETE_FILE(id) {
    try {
      let { data } = await axios.delete(
        `${this.apiEnpoint}${this.service}/files/${id}`,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }
}

export default new FileServices(FILE.BASE);
