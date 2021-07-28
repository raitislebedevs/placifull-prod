import CoreServices from './coreServices';
import { VACANCY_LISTING } from '../constants';

class VacancyListingService extends CoreServices {}

export default new VacancyListingService(VACANCY_LISTING.BASE);
