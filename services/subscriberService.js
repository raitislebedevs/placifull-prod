import CoreServices from './coreServices';
import { SUBSCRIBER } from '../constants';

class SubscriberService extends CoreServices {}

export default new SubscriberService(SUBSCRIBER.BASE);
