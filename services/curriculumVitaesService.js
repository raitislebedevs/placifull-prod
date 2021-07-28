import CoreServices from './coreServices';
import { CURRICULUM_VITAES } from '../constants';

class CurriculumVitaesService extends CoreServices {}

export default new CurriculumVitaesService(CURRICULUM_VITAES.BASE);
