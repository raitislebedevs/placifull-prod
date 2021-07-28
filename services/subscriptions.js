import CoreServices from './coreServices';
import { SUBSCRIPTION } from '../constants';

class Subscriptions extends CoreServices {}

export default new Subscriptions(SUBSCRIPTION.BASE);
