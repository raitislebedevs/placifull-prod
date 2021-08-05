import CoreServices from './coreServices';
import { REFERRAL_PROGRAM } from '../constants';

class RefferalServices extends CoreServices {}

export default new RefferalServices(REFERRAL_PROGRAM.BASE);
