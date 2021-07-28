import CoreServices from './coreServices';
import { LANGUAGES } from '../constants';

class LanguageService extends CoreServices {}

export default new LanguageService(LANGUAGES.BASE);
