import * as simPic from './sim';
import * as livePic from './live';
const IS_LIVE = false; // NOTE: change this two switch between live and sim mode
export const pic = (IS_LIVE) ? livePic : simPic;
