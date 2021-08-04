import CoreServices from './coreServices';
import { VOTING_BOARD } from '../constants';

class VotingBoardService extends CoreServices {}

export default new VotingBoardService(VOTING_BOARD.BASE);
