import bounty_logo from "../img/token-logos/bounty_logo.png";
import gigs_logo from "../img/token-logos/giga_logo.png";
import usdc_logo from "../img/token-logos/usdc_logo.png";
import wsol_logo from "../img/token-logos/wsol_logo.png";

export type BriefStreamState = {
    token_image_url: string,
    total_tokens_streamed: number,
    daily_stream_rate: number,
    num_subscribers: number,
}

let s1: BriefStreamState = {
    token_image_url: gigs_logo,
    total_tokens_streamed: 54.2344,
    daily_stream_rate: 100.0,
    num_subscribers: 345,
}

let s2: BriefStreamState = {
    token_image_url: usdc_logo,
    total_tokens_streamed: 3245.1234,
    daily_stream_rate: 50.0,
    num_subscribers: 60,
}

let s3: BriefStreamState = {
    token_image_url: bounty_logo,
    total_tokens_streamed: 1.1234,
    daily_stream_rate: 8888.0,
    num_subscribers: 60,
}

let s4: BriefStreamState = {
    token_image_url: wsol_logo,
    total_tokens_streamed: 100.1234,
    daily_stream_rate: 342.0,
    num_subscribers: 23,
}

export type DisplayDataDAO = {
    display_name: string;
    dao_id: string;
    num_nfts: number;
    twitter_url: string;
    image_url: string;
    active_streams: Array<BriefStreamState>;
    is_member: boolean;
    streams_loaded: boolean;
    dao_address: string | undefined;
};

export { s1, s2, s3, s4};
