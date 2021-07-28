import CoreServices from './coreServices';
import { TRANSPORT_LISTING } from '../constants';

class TransportListingService extends CoreServices {}

export default new TransportListingService(TRANSPORT_LISTING.BASE);
