import CoreServices from './coreServices';
import { STRIPE_PAYMENT } from '../constants';

class StripeServiss extends CoreServices {}

export default new StripeServiss(STRIPE_PAYMENT.BASE);
