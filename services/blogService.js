import CoreServices from './coreServices';
import { BLOGS } from '../constants';

class BlogService extends CoreServices {}

export default new BlogService(BLOGS.BASE);
