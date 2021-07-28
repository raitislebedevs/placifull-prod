import CoreServices from './coreServices';
import { JOB_APPLICATION } from '../constants';

class JobApplication extends CoreServices {}

export default new JobApplication(JOB_APPLICATION.BASE);
