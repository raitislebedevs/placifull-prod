import CoreServices from './coreServices';
import { REAL_ESTATE_LISTINGs } from '../constants';

class RealEstateListingServices extends CoreServices {}

export default new RealEstateListingServices(REAL_ESTATE_LISTINGs.BASE);
