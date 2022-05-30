import * as simPic from './sim';
import * as livePic from './live';
const IS_LIVE = true; // NOTE: change this two switch between live and sim mode
// export const NETWORK = " https://api.mainnet-beta.solana.com/";
export const NETWORK = "https://broken-falling-dew.solana-mainnet.quiknode.pro/2593467a7cd46abf29edb3da687386fd3c3b7f59/"
export const pic = (IS_LIVE) ? livePic : simPic;
