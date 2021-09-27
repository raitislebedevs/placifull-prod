import CoreServices from './coreServices';
import { VACANCY_FILTERS } from 'constants/services';

class VacancyFilter extends CoreServices {}

export default new VacancyFilter(VACANCY_FILTERS.BASE);
