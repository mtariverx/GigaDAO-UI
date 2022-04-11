export type CandyMachineDisplayData = {
    name: string;
    description: string;
    collection_count: number;
    redeemed_count: number;
    price_sol: number;
    listed_mint_date: number;
    image_url: string;
    website_url: string;
};

const SECONDS_IN_DAY = 60*60*24;

let sampleMint1: CandyMachineDisplayData = {
    name: "Dino Beach Club #4543",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 1111,
    redeemed_count: 0,
    price_sol: 2.0,
    listed_mint_date: 1646509828 - SECONDS_IN_DAY*6,
    image_url: "https://lajywxgldjcdfje223pvbpuh2iktjzbm2vbbhzzzrmofd5i6zxlq.arweave.net/WBOLXMsaRDKkmtbfUL6H0hU05CzVQhPnOYscUfUezdc?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};

let sampleMint2: CandyMachineDisplayData = {
    name: "Dino Beach Club #0015",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 1500,
    redeemed_count: 0,
    price_sol: 1.0,
    listed_mint_date: 1646509928 - SECONDS_IN_DAY*5,
    image_url: "https://lon22xldoffpya33gvza3pcdlnoylxprcnqexd32wl4usvubsm.arweave.net/W5u_tXWNxSvwDezVyDbxDW12F3fETYEuPerL5SVaBkw?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};
let sampleMint3: CandyMachineDisplayData = {
    name: "Dino Beach Club #1243",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 666,
    redeemed_count: 0,
    price_sol: 1.5,
    listed_mint_date: 1646507828 - SECONDS_IN_DAY*4,
    image_url: "https://fm6tpvnfkr5zevkwhklczaeult3fnh32dbftxxhxsrzn6goyd2kq.arweave.net/Kz031aVUe5JVVjqWLICUXPZWn3oYSzvc95Ry3xnYHpU?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};
let sampleMint4: CandyMachineDisplayData = {
    name: "Dino Beach Club #0502",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 1111,
    redeemed_count: 0,
    price_sol: 1.0,
    listed_mint_date: 1646509228 - SECONDS_IN_DAY*3,
    image_url: "https://obcuhqb2zppsvezeb2pqvjk4xeqi5ghidbdm5rtfc3fz2fkg.arweave.net/cEVDwDrL3yqTJA6fCqVcuSCOmOgYRs7GZRbLnRV_G-A?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};
let sampleMint5: CandyMachineDisplayData = {
    name: "YourMother LTD",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 4444,
    redeemed_count: 0,
    price_sol: 0.2,
    listed_mint_date: 1646519828 - SECONDS_IN_DAY*2,
    image_url: "https://xu3j7tq4cbtglh2q2ljjdhcnoigcor5tsfog4kjw2iaiaa7ujocq.arweave.net/vTafzhwQZmWfUNLSkZxNcgwnR7ORXG4pNtIAgAP0S4U/?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};
let sampleMint6: CandyMachineDisplayData = {
    name: "InsertNameHere",
    description: "1111 Cybogrez collection is the 2nd phase of NFTs from Zankoku labz. Staked Cyborgrez receive 10 $JUNK/day.",
    collection_count: 1111,
    redeemed_count: 0,
    price_sol: 1.8,
    listed_mint_date: 1646508828 - SECONDS_IN_DAY*1,
    image_url: "https://4ukhculrc2fwadetqa6upi7ftfakpxj5iq4gtgq2tof6cr2qiy.arweave.net/5RRxUXEWi2AMk_4A9R6PlmUCn3T1EOGmaGpuL4UdQRs/?ext=png",
    website_url: "https://twitter.com/ZankokuLabz",
};

const sampleMintArray = [sampleMint1, sampleMint2, sampleMint3, sampleMint4, sampleMint5, sampleMint6];

export {sampleMintArray};
