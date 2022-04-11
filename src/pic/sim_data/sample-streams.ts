import img1 from "img/token-logos/bounty_logo.png";
import img2 from "img/token-logos/giga_logo.png";

export type SubscribedTokenStream = {
    stream_name: string;
    nft_name: string;
    is_active: boolean;
    pool_reserve_amount: number;
    daily_stream_rate: number;
    num_subscribers: number;
    token_name: string;
    token_ticker: string;
    token_image_url: string;
    provider_dao_id: string;
    earned_amount: number;
    claimed_amount: number;
};

let sampleTokenStream1: SubscribedTokenStream = {
    stream_name: "Beta Tester Stream",
    nft_name: "Peach Pass #0003",
    is_active: true,
    pool_reserve_amount: 10000,
    daily_stream_rate: 1.0,
    num_subscribers: 563,
    token_name: "Bounty Points",
    token_ticker: "BTPS",
    token_image_url: img1,
    provider_dao_id: "peachdao",
    earned_amount: 6.3452,
    claimed_amount: 1.4335,
}

let sampleTokenStream2: SubscribedTokenStream = {
    stream_name: "GIGS IDO Stream",
    nft_name: "Peach Pass #0244",
    is_active: true,
    pool_reserve_amount: 88888888,
    daily_stream_rate: 420.69,
    num_subscribers: 3953,
    token_name: "Gigs",
    token_ticker: "GIGS",
    token_image_url: img2,
    provider_dao_id: "gigadao",
    earned_amount: 668.3452,
    claimed_amount: 500.00,
}

export {sampleTokenStream1, sampleTokenStream2};

