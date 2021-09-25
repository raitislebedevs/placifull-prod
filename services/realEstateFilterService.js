import CoreServices from './coreServices';
import { REAL_ESTATE_FILTER } from 'constants/services';

class RealEstateFilterService extends CoreServices {}

export default new RealEstateFilterService(REAL_ESTATE_FILTER.BASE);
