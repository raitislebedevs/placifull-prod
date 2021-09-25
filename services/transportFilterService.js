import CoreServices from './coreServices';
import { TRANSPORT_FILTER } from 'constants/services';

class TransportFilterService extends CoreServices {}

export default new TransportFilterService(TRANSPORT_FILTER.BASE);
