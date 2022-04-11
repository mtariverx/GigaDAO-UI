
export type CandyMachineDisplayDataV2 = {
    name: string;
    image_url: string;
};

let sampleMap: { [key: string]: Array<CandyMachineDisplayDataV2>} = {

    "kaijureborn": [
        {name: "Kaiju #554", image_url: "https://arweave.net/dsQpH7oDcvzTTloubB7YOgfuKyLKCHwEBzeqpXSoigk?ext=png"},
        {name: "Kaiju #1022", image_url: "https://arweave.net/aTC2OZmTRSZhtc4AN31kIaXMjNkqp8mwhKfAR899L4Y?ext=png"},
        {name: "Kaiju #527", image_url: "https://arweave.net/NTmAWTnYDpbAOZiMTY_FPk_Dpg6EK6vH8wYQTxyRl-c?ext=png"},
        {name: "Kaiju #815", image_url: "https://arweave.net/Bh0oKcN0KsJgS8I2Ctxr9dw92cLe1g633XpNTrpsx4g?ext=png"}
    ],"solarnauts": [
        {name: "Miner Bot 387", image_url: "https://www.arweave.net/5SbLoGzPLDd9qcZotAVPd1PPqoc-xSvv9nzwiKgHnws?ext=png"},
        {name: "Cadet 362", image_url: "https://www.arweave.net/ZPCGGsBXSd1G33ifVN2rrnLrX0_lmmpQkhUMFUtiV4g?ext=png"},
        {name: "Miner Bot 118", image_url: "https://www.arweave.net/6Y3AQoPwdPNq_OwimsdzaffoRgSviHufu_SHpSiJzD8?ext=png"},
        {name: "Miner Bot 385", image_url: "https://www.arweave.net/QC7KtdEp9oy8xJ8Obe7CI7bsCndk7pts7pL84C8wG1Y?ext=png"}
    ],"friendlyfrogsocialclub": [
        {name: "Friendly Frog #1254", image_url: "https://www.arweave.net/9GECPefafM9Yo6ZVVt4GE2I9gTmKZLX6A8ebLtMM0eU?ext=png"},
        {name: "Friendly Frog #105", image_url: "https://www.arweave.net/2JL8E8QvS01Sar5B-uUIozeqGDqyx75FFgouESw4Xe4?ext=png"},
        {name: "Friendly Frog #2055", image_url: "https://www.arweave.net/ZLcR-Qrrfn-dUhBlweLDqfaga1we-O34NEqeiMG8zS4?ext=png"},
        {name: "Friendly Frog #1999", image_url: "https://www.arweave.net/5Qjg-bkzSf7H4OJ4SNoOAj5HhWvPuwzZV6utkaN5xMI?ext=png"}
    ],"apesbvipclub": [
        {name: "Apes VIP Club #122", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/apes-vip-club/images/2ecac8f5017f3ff0dd8e8c578df8758d.png"},
        {name: "Apes VIP Club #35", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/apes-vip-club/images/14653330d6431360e7f3248af6fd0f01.png"},
        {name: "Apes VIP Club #167", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/apes-vip-club/images/effa01f2c0475aea655f4f6458820b72.png"},
        {name: "Apes VIP Club #162", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/apes-vip-club/images/a5b279fe4e868b34357cb165adb4c0ba.png"}
    ],"spacerunners": [
        {name: "Space Runners #1283", image_url: "https://metadata-temp-api.spacerunners.com/images/1283"},
        {name: "Space Runners #8417", image_url: "https://metadata-temp-api.spacerunners.com/images/8417"},
        {name: "Space Runners #9942", image_url: "https://metadata-temp-api.spacerunners.com/images/9942"},
        {name: "Space Runners #7243", image_url: "https://metadata-temp-api.spacerunners.com/images/7243"}
    ],"bokungeckos": [
        {name: "Bokun Gold Card #291", image_url: "https://arweave.net/5hC_SIMlZF_FcZDQhQuoJP3GnS9uUmB5cQDRtcwGgWg?ext=png"},
        {name: "Bokun Gold Card #125", image_url: "https://arweave.net/Tos8Wo-2UD9CMXyDFgl8tnP4AZDz-kxgCbvoxtXl8Mw?ext=png"},
        {name: "Bokun Gold Card #42", image_url: "https://arweave.net/pywGcxVj6Z0sPvCrS2FDOKc_R46hFZmvapKV_8PwJkM?ext=png"},
        {name: "Bokun Gold Card #233", image_url: "https://arweave.net/XRftVhDuoUBSe1fjjGlGH8VEStHvMjFO4WIbNWJcLk0?ext=png"}
    ],"nonanasolana": [
        {name: "NONANA SOLANA #59", image_url: "https://www.arweave.net/dMDRHYZkkVGmoooFYFNsqbINr_W9rlBinWWdCUIBJ60?ext=png"},
        {name: "NONANA SOLANA #1387", image_url: "https://www.arweave.net/sjS61jzbTFUymUSSf0DwRaKxeQIF4SS0UdgEVcz5XwA?ext=png"},
        {name: "NONANA SOLANA #1235", image_url: "https://www.arweave.net/wdTeHoqCnYvJ4vrmdTwae7xCTcwpuH-xQGrPanhzK1c?ext=png"},
        {name: "NONANA SOLANA #1483", image_url: "https://www.arweave.net/mo5HVuHaZniX1FgQpIBnIxF1izMlwHhqDst6pBZFjJ0?ext=png"}
    ],"solyetis": [
        {name: "SOLYETIS #7416", image_url: "https://www.arweave.net/FuLVQvBGsU8NdlETnKfgCtdh4ytUpDNCjFgc5DGAbQk?ext=png"},
        {name: "SOLYETIS #3462", image_url: "https://www.arweave.net/xjLUegj54g0D9LjB3HVIgit2vQesrJOiwGXWJRcHD5k?ext=png"},
        {name: "SOLYETIS #2824", image_url: "https://www.arweave.net/W9b_x8RxYjmaLgdkvpyJgD48NxYb2Fgk6tfEgNbRIO0?ext=png"},
        {name: "SOLYETIS #8882", image_url: "https://www.arweave.net/M_i5Sj2C1hDQ0E_HRBFU1LpsRRofiDw15X-WhryJzbY?ext=png"}
    ],"dilltheseal": [
        {name: "Dill The Seal #2067", image_url: "https://www.arweave.net/QRrEq7v_mJAUzKH6xhUOb70uXU57JwABg1hjlCcZ4aY?ext=png"},
        {name: "Dill The Seal #3175", image_url: "https://www.arweave.net/cwu_vnVOUORpQ3xGh1lqOJVOT9_jJtYqX84ENPI3ST8?ext=png"},
        {name: "Dill The Seal #3141", image_url: "https://www.arweave.net/Ln8Km4adE8K2VDKO-HYn1v3vPuKx2OiWlyIjgy84948?ext=png"},
        {name: "Dill The Seal #6370", image_url: "https://www.arweave.net/ICEm9W2z39aR29NpU8Kd62hWeblwEhaNl99v7VM1hzA?ext=png"}
    ],"skellygangnft": [
        {name: "Skelly Gang #298", image_url: "https://arweave.net/-UjMX_OZXsGxnHK0UO5r7Xlqj_yGV9_jx5nGT-lh95k"},
        {name: "Skelly Gang #29", image_url: "https://arweave.net/tc6GiG5Sr-7qoYB7OeSNcau3TlQMXLBVZPVoFoeFCEc"},
        {name: "Skelly Gang #477", image_url: "https://arweave.net/t1zobsfxqpLa1HEMXl-Ri3LcXlEG3VEWwClvGgnO4Eg"},
        {name: "Skelly Gang #30", image_url: "https://arweave.net/mnZ4OzSLiUcXfwDyVgmyqOF7UCd3fzZQrYBW0WBi9Kw"}
    ],"thugmoknkez": [
        {name: "ThugMonkez #1350", image_url: "https://arweave.net/7RW6HE1qWlaFfAub06M4NC1eQnajxH-r9xPLmB52IYI?ext=png"},
        {name: "ThugMonkez #1237", image_url: "https://arweave.net/_MHFqjypSDvmnJx6bqaAWp_aRN1ywXGSMkJy41qxtcU?ext=png"},
        {name: "ThugMonkez #535", image_url: "https://arweave.net/PKGA17hxc0HyZIq55xl_PtcCQlYhyfkqi6KKEWKqkCM?ext=png"},
        {name: "ThugMonkez #1179", image_url: "https://arweave.net/r45yTzE3KFWC-WQ08HmMp0ZEBVb4kpjfPpq0d-vK1uM?ext=png"}
    ],"solanamonkerejects": [
        {name: "Monke #861", image_url: "https://d1g1xztyt00aex.cloudfront.net/assets/860.png"},
        {name: "Monke #1890", image_url: "https://d1g1xztyt00aex.cloudfront.net/assets/1889.png"},
        {name: "Monke #1594", image_url: "https://d1g1xztyt00aex.cloudfront.net/assets/1593.png"},
        {name: "Monke #5859", image_url: "https://d1g1xztyt00aex.cloudfront.net/assets/5858.png"}
    ],"moshiheads": [
        {name: "Moshiheads #2036", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/moshiheads/images/4d6f18eb3a6d4bd5a29864f2ccd10e74.png"},
        {name: "Moshiheads #1124", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/moshiheads/images/dd9f4d3b9482eb8fe021e85887a16438.png"},
        {name: "Moshiheads #1533", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/moshiheads/images/18f7db260f3d88f0774e917137ed8c5f.png"},
        {name: "Moshiheads #1026", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/moshiheads/images/0d29349d852ed06425f3a51f957de5ed.png"}
    ],"portalscitizencards": [
        {name: "Citizen Card #3462", image_url: "https://ipfs.io/ipfs/Qmd31K7on1bcfut9Dd7oabWkmZ4DXod4MAsQkoi7mKM72V"},
        {name: "Citizen Card #1916", image_url: "https://ipfs.io/ipfs/Qmd31K7on1bcfut9Dd7oabWkmZ4DXod4MAsQkoi7mKM72V"},
        {name: "Citizen Card #718", image_url: "https://ipfs.io/ipfs/Qmd31K7on1bcfut9Dd7oabWkmZ4DXod4MAsQkoi7mKM72V"},
        {name: "Citizen Card #1175", image_url: "https://ipfs.io/ipfs/Qmd31K7on1bcfut9Dd7oabWkmZ4DXod4MAsQkoi7mKM72V"}
    ],"bullandbears": [
        {name: "Bear #1162", image_url: "https://prodbnbnft.s3.us-east-2.amazonaws.com/1162.png"},
        {name: "Admission Pass #303", image_url: "https://arweave.net/nuIsyF2D9nezT5wlXW1lAAmevWJKqnDLmMj-50EvOfQ?ext=gif"},
        {name: "Admission Pass #1082", image_url: "https://arweave.net/ZHLEWaVxlqm0H79qQsnj5RxQA6tGk6mDC_RoM28C6WY?ext=gif"},
        {name: "Admission Pass #1951", image_url: "https://arweave.net/nuIsyF2D9nezT5wlXW1lAAmevWJKqnDLmMj-50EvOfQ?ext=gif"}
    ],"soulkombatdragons": [
        {name: "Dragon #420", image_url: "https://www.arweave.net/zesJkVUUIFgvl3E_fB4txogtucu516P03iASA0Smo7s?ext=png"},
        {name: "Dragon #616", image_url: "https://www.arweave.net/r1PMD5y8Dy2JMjRvwn656D-hGeLEljSuQYp51CVNtNc?ext=png"},
        {name: "Dragon #223", image_url: "https://www.arweave.net/AgBK9OXVNkq4idlTmkZPhp3ldJKISjQrY94lXBA3cOs?ext=png"},
        {name: "Dragon #226", image_url: "https://www.arweave.net/oLRly1qPm3HXEtNO7SNBu_Qq5faCmI6m3ilIxYe3DII?ext=png"}
    ],"antisoccialrobots": [
        {name: "Anti Social Bot #2571", image_url: "https://www.arweave.net/9OhdmeL_uIDpClZxT7GZiRZy-s2UDg5fnjZ9xPb4GE8?ext=png"},
        {name: "Anti Social Bot #800", image_url: "https://www.arweave.net/D05VXAODpYmHwW7OK8AeqyxT0A80wo7SCssiSZ0yOCs?ext=png"},
        {name: "Anti Social Bot #3209", image_url: "https://www.arweave.net/5HY0Z9hoNjY6a88IrKxw2zAVsg6ExqMnj6nZaTqd3jM?ext=png"},
        {name: "Anti Social Bot #1991", image_url: "https://www.arweave.net/RCrI-jbcvl88IVXMBOkYUAgfZFXDTZgjm93lXuxz5nk?ext=png"}
    ],"solqueens": [
        {name: "SolQueens #3891", image_url: "https://arweave.net/K3kEZzHuEouo6RrAmwp03hIApWElFjUUE5mNBqMRPuo"},
        {name: "SolQueens #4288", image_url: "https://arweave.net/uecMfitDO-MdQBaVw8_dr_yMpXrU9h52-GFeQSR_MTA"},
        {name: "SolQueens #3089", image_url: "https://arweave.net/seJTgVuL7ief7V2a5KFjayeKvqCRqDEodQdjTfjxND0"},
        {name: "SolQueens #2716", image_url: "https://arweave.net/LfNRa_8XFYC1vnjXZoCWCq8GlR9zkI8Pr-wN1bj7OdM"}
    ],"solanamoneyboys": [
        {name: "Solana Money Boy #2010", image_url: "https://www.arweave.net/_gAQK1DqsgbDkNTyTEW1cNgBZZSUCw28qwLw8IapdZI?ext=png"},
        {name: "Solana Money Boy #1537", image_url: "https://www.arweave.net/EHsOP-kYTy-WRdnOov2e7NYHlRkuRtvDaKNHqkTNfn0?ext=png"},
        {name: "Solana Money Boy #1896", image_url: "https://www.arweave.net/L63Nz6Ha4KkiZSA3LQYxO4TTXO6MbDfgAtWZ4hmJyI8?ext=png"},
        {name: "Solana Money Boy #1440", image_url: "https://www.arweave.net/Orz9ZLy1bNI5jefEeRkqE90zS8e_K-yzERPDXFrnMf8?ext=png"}
    ],"alphagorillas": [
        {name: "Alpha #4705", image_url: "https://bafybeicw63igzehj3wgmygyod2tvr7n3wnnehnpkaec3lhlyxf5tcoxjca.ipfs.dweb.link/4705.png"},
        {name: "Alpha #2032", image_url: "https://bafybeibew47qz7mginf6qtvcvebraly3jl2cc5n42izzee3m6usnttcilm.ipfs.dweb.link/2032.png"},
        {name: "Alpha #3572", image_url: "https://bafybeiaqnewbhipsjk5iiskh5hkykodf6omk4bp3vacq3lk6bjnvf25jda.ipfs.dweb.link/3572.png"},
        {name: "Alpha #3040", image_url: "https://bafybeidxof6xefot5fnv667t2vfa36r5ljs7kermptgc4zvefrcs6cstyu.ipfs.dweb.link/3040.png"}
    ],"aldermages": [
        {name: "Alder Mages #1245", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/alder-mages/images/09fe033d7f85f85e869d68e7d18ef83e.png"},
        {name: "Alder Mages #53", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/alder-mages/images/ed56a569d5453c0110973b5b80006b54.png"},
        {name: "Alder Mages #566", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/alder-mages/images/06df8a76dbce8f62a419d8f140f3e1a2.png"},
        {name: "Alder Mages #612", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/alder-mages/images/b855ae1af865abd44292e794e8112b55.png"}
    ],"soullesspets": [
        {name: "Soulless Pets #1814", image_url: "https://www.arweave.net/Nhf0lqwdhPeG2btyWRwarGYyo169pQkJtRHU_arPZdQ?ext=png"},
        {name: "Soulless Pets #177", image_url: "https://www.arweave.net/oUopfwnCjkZPVgVCADYEy4IqFJVP_wpICEWiXIY8v3o?ext=png"},
        {name: "Soulless Pets #2636", image_url: "https://www.arweave.net/WsHCMNUhnV4T8Icu9PCmZJfORMtfTtW0fCwK65Qx5q0?ext=png"},
        {name: "Soulless Pets #2229", image_url: "https://www.arweave.net/-hSAa8SnyenlcGvAzkki2q3ynHFFRJBtyD9EkMU20Jg?ext=png"}
    ],"pixelracersgen1": [
        {name: "Pixel Racers #5788", image_url: "https://www.arweave.net/xjghZRowQpBNCNcO5iya1-lH1KAmKkvPaPBAB6FlaT4"},
        {name: "Pixel Racers #1301", image_url: "https://www.arweave.net/aVDbM_VfUjvcPRc376amiZHC-mKOGvcTTI4M_d19o-E"},
        {name: "Pixel Racers #83", image_url: "https://www.arweave.net/JUVaPASVO-rchC_BFGqdl9EwgnHLoO43uSgwt53x2h8"},
        {name: "Pixel Racers #6153", image_url: "https://www.arweave.net/sR091eBhISmc-BdD-1AIS0FneNQ0mo9lhcIKougwXm8"}
    ],"pixelracersgen1pitcrew": [
        {name: "Pixel Racers Gen. 1 Pit Crew", image_url: "https://www.arweave.net/AQ33xPgqBIRmIULlvPFDUMWc9VhOfqIthwo6zagebHI"},
        {name: "Pixel Racers Gen. 1 Pit Crew", image_url: "https://www.arweave.net/AQ33xPgqBIRmIULlvPFDUMWc9VhOfqIthwo6zagebHI"},
        {name: "Pixel Racers Gen. 1 Pit Crew", image_url: "https://www.arweave.net/AQ33xPgqBIRmIULlvPFDUMWc9VhOfqIthwo6zagebHI"},
        {name: "Pixel Racers Gen. 1 Pit Crew", image_url: "https://www.arweave.net/AQ33xPgqBIRmIULlvPFDUMWc9VhOfqIthwo6zagebHI"}
    ],"royalepandasclub": [
        {name: "Royale Pandas Club #5048", image_url: "https://royalepandas.mypinata.cloud/ipfs/QmUkxpLrfHpPedsenAEUsuW1KzKGiJrx3Jw5UWeqCnQmU8/5048.png"},
        {name: "Royale Pandas Club #2406", image_url: "https://royalepandas.mypinata.cloud/ipfs/QmcWcPwfDAqVRx3kXUhCC37uhJeTDdwJjFk5UZH4PweMRS/2406.png"},
        {name: "Royale Pandas Club #4702", image_url: "https://royalepandas.mypinata.cloud/ipfs/QmUkxpLrfHpPedsenAEUsuW1KzKGiJrx3Jw5UWeqCnQmU8/4702.png"},
        {name: "Royale Pandas Club #6561", image_url: "https://royalepandas.mypinata.cloud/ipfs/QmUMjmPxut7BarRexmiTk1pHH1Mk4YroQF1rswT5RhpF5t/6561.png"}
    ],"entrance": [
        {name: "ENTRANCE #825", image_url: "https://bafybeigmby6fgl3kesbhajdh6teftqiqnqqt25uyyvmnzfw5jkzctgewke.ipfs.dweb.link/0.png?ext=png"},
        {name: "ENTRANCE #3726", image_url: "https://bafybeigmby6fgl3kesbhajdh6teftqiqnqqt25uyyvmnzfw5jkzctgewke.ipfs.dweb.link/0.png?ext=png"},
        {name: "ENTRANCE #612", image_url: "https://bafybeigmby6fgl3kesbhajdh6teftqiqnqqt25uyyvmnzfw5jkzctgewke.ipfs.dweb.link/0.png?ext=png"},
        {name: "ENTRANCE #2798", image_url: "https://bafybeigmby6fgl3kesbhajdh6teftqiqnqqt25uyyvmnzfw5jkzctgewke.ipfs.dweb.link/1.png?ext=png"}
    ],"soltreez": [
        {name: "SolTree #1686", image_url: "https://www.arweave.net/SyBdh_xoxWen5OleOrJhzjfC8VvGWZInxPScOQnQVIk?ext=png"},
        {name: "SolTree #4371", image_url: "https://www.arweave.net/x807TxqxquKNnc3RWuvKaXrN453bSFVlSV3evU_DUuI?ext=png"},
        {name: "SolTree #78", image_url: "https://www.arweave.net/fOwx1IVjBr2rpAGtvBPJ1QlnZqdyUJUvZXrl-dr0JXM?ext=png"},
        {name: "SolTree #3846", image_url: "https://www.arweave.net/zLk4TkLv5srtPcwlqZsssTgFAxVjgkazXHfBHviHAOE?ext=png"}
    ],"solroyalti": [
        {name: "SolRoyalti #2818", image_url: "https://www.arweave.net/A0n_O7jvs6Xx2KRSUXDdRoxhBUAGjCIt7T5mlsogNCQ?ext=png"},
        {name: "SolRoyalti #2810", image_url: "https://www.arweave.net/cJKTU8FMC93gn5v--9A0ih5FKVR33FJtYFBUFDZl0AI?ext=png"},
        {name: "SolRoyalti #2262", image_url: "https://www.arweave.net/H_ZUEFwqcgSztPNx1BMzV2txiBG8EjMTxO0nsOfrhKI?ext=png"},
        {name: "SolRoyalti #3623", image_url: "https://www.arweave.net/fw-crtd7hnOXADX9l9MytB3pb3FohIX9PJgi0Dc2Gks?ext=png"}
    ],"botheredottersgoldentickets": [
        {name: "Golden Ticket #7595", image_url: "https://www.arweave.net/Kkoir7wUl8ASNY161wWOlm42c8DmQQgjaJlqR15wmbY?ext=png"},
        {name: "Golden Ticket #8300", image_url: "https://www.arweave.net/bcJ6sX9MLWcAdKcSVDstPst8B2ix1nQW_EIsxNz3c_k?ext=png"},
        {name: "Golden Ticket #6291", image_url: "https://www.arweave.net/k0mwzzqxkKQalYDObbqUfP7zpXm5xJGdCuxuJD5Z7uo?ext=png"},
        {name: "Golden Ticket #2967", image_url: "https://www.arweave.net/qzzavqSwyjGRJdl1N75RgIPJiukFHLSdSbCmthmuMQo?ext=png"}
    ],"888anonclub": [
        {name: "888AC #13", image_url: "https://www.arweave.net/g6US4HUAoeQU8G_NJU79L9PtXiWPt9maANxGzhN0tU4?ext=png"},
        {name: "888AC #658", image_url: "https://www.arweave.net/n1NhK55couWiITPeWwDFT0NF6VQ2ciPp2RWJUxjPmgY?ext=png"},
        {name: "888AC #193", image_url: "https://www.arweave.net/WwJqTmh83xP0XmQI_Q8pdd39wektX7bdwVq9gPqTvlo?ext=png"},
        {name: "888AC #195", image_url: "https://www.arweave.net/Vcjgao5TvQ79wsChdiWjZg48vLY6_dIQf-BJ-uaKu4M?ext=png"}
    ],
    "blankies": [
        {name: "Blankie #312", image_url: "https://www.arweave.net/00txRnW66Wn3LgWrvmiWu26yQmyNKFu6ILZKkOs2DUw?ext=png"},
        {name: "Blankie #163", image_url: "https://www.arweave.net/l6HowPLXMMOyVu6phJiAe18UuXzm58J5te8mboSv_Sc?ext=png"},
        {name: "Blankie #16", image_url: "https://www.arweave.net/rnhFupA_wDI7EVHNV5yyMPSqApgeLDoZvvz4YFXTZCI?ext=png"},
        {name: "Blankie #41", image_url: "https://www.arweave.net/BtQujX8jOxVTOUbXY-k2AWgdciGTZaxkPWNdZ-VXGU0?ext=png"}
    ],
    "almostfamouspandas": [
        {name: "Almost Famous Pandas #4411", image_url: "https://bafybeidv7yiuguvrxzv7kqrc5pdntw47jcttjnnfekryhzp5gg5aeg4jhq.ipfs.dweb.link/4410.png?ext=png"},
        {name: "Almost Famous Pandas #5933", image_url: "https://bafybeia4sz7lp5ccytirkwohpd5wggm23dizzfj6otbpo2rtn6mnk3m5f4.ipfs.dweb.link/5932.png?ext=png"},
        {name: "Almost Famous Pandas #203", image_url: "https://bafybeiguvrapfawgnyb4pdzfhq4flvux4w7iq3wwiia3wnxsw3jlhizcpy.ipfs.dweb.link/202.png?ext=png"},
        {name: "Almost Famous Pandas #2320", image_url: "https://bafybeigcpt3b266ua2chdltangjregvezej2tzurhy3rkorcce5wtxk6ly.ipfs.dweb.link/2319.png?ext=png"}
    ],"monkeykingdom": [
        {name: "Monkey Kingdom #2096 ", image_url: "https://arweave.net/IGmHlp08Mh5Wkz7jnii3tX0Q226nN7_Ov3qd5Oc4jas"},
        {name: "Monkey Kingdom #1067 ", image_url: "https://arweave.net/WFEmRP3e814CwRTOfNhfNLQKJif_0yx1J2I36NQzZmI"},
        {name: "Monkey Kingdom #1557 ", image_url: "https://arweave.net/4-0CWvx__Gu0Q4gvha7w9FUL0ZyQtuw81ewP4SrKoZk"},
        {name: "Monkey Kingdom #1820 ", image_url: "https://arweave.net/gyDwQSRSEnxxHyFnR_gYAxSQsvcAl2L4W7eF6uaVlsA"}
    ],"cryptograf": [
        {name: "CryptoGraf166", image_url: "https://arweave.net/2q4pvy2p3OKxJ0Rihnjq3KX4tmYyIwz1le0WYMA3LMc"},
        {name: "CryptoGraf127", image_url: "https://arweave.net/_nkqFQZ2Vlf0egoWteqP9xl7FoL3-JYU6zPBTlFL4ZU"},
        {name: "CryptoGraf2885", image_url: "https://arweave.net/41Xm6LFedv5utwynm5xXQkZcIrj2CMNMdwl4EGKmAXg"},
        {name: "CryptoGraf1800", image_url: "https://arweave.net/vi1Ux6XVgRkS3LzVcY-RMo9d3bc9M84sHwlLnePJQ78"}
    ],"solislands": [
        {name: "Sol Islands #1688", image_url: "https://www.arweave.net/sRAq9TenonlJz0xnnURM-bGCIbizgxsqgqdNZeA-fzU?ext=png"},
        {name: "Sol Islands #3975", image_url: "https://www.arweave.net/Ki0gjeMTdV5OcB3522JruoYp51VtFwagGucSce1PaWI?ext=png"},
        {name: "Sol Islands #1222", image_url: "https://www.arweave.net/RKqvkwkRze7dlxhwZZ0NY28KtQJVUadKF6HIGOT2WI0?ext=png"},
        {name: "Sol Islands #692", image_url: "https://www.arweave.net/vxFPxlXOE5OfXyX9oVE0raY3iNVj9U8eO6_ikr1OOTk?ext=png"}
    ],"wabbits": [
        {name: "Wabbits #882", image_url: "https://www.arweave.net/tRjY59BTUlMIy1H9nGfCzTzyMYb-rDrXcJyExm544Js?ext=png"},
        {name: "Wabbits #319", image_url: "https://www.arweave.net/9Jivfh8mz4rnFDrIgAtgJIY04UDRODpYVZD965kP-LA?ext=png"},
        {name: "Wabbits #1508", image_url: "https://www.arweave.net/3DG-C6AqgYrCdAMqYMt6aovkiMD9-0J18D8rOEysXyk?ext=png"},
        {name: "Wabbits #311", image_url: "https://www.arweave.net/kDA2O_I3A2V8N_65WVH9T_r3N3wUia_gYMnWyMsZiiY?ext=png"}
    ],"skylinenft": [
        {name: "SKYLINE #0317", image_url: "https://www.arweave.net/Q0XLPqpi5XrN8GkEiqu7uc_wdgdlx9z6amEGmNcQCGw?ext=png"},
        {name: "SKYLINE #0854", image_url: "https://www.arweave.net/XXXKKK82ZGxAvW3wkY23cqUTajVFOhIa_Xr8Nidt4Rs?ext=png"},
        {name: "SKYLINE #0135", image_url: "https://www.arweave.net/ZYrgox6NHI21ChFaBSfQqgJfq7IgFSCXK9Sx804ICh8?ext=png"},
        {name: "SKYLINE #0554", image_url: "https://www.arweave.net/bSH5IBtP4YLQ7eV0jl9F5YQo-hHv3bPoCOt0pfcUHCg?ext=png"}
    ],"0euvrefristgen": [
        {name: "0euvre-FirstGen #71 of 999", image_url: "https://www.arweave.net/4uOOLEssxuMn-YCI76pZvo69uoGSzdJo9wcLP_bdYV8?ext=png"},
        {name: "0euvre-FirstGen #50 of 999", image_url: "https://www.arweave.net/LngF5HzzrrHoqTxkuQOBYT0r1pfBU_1cauet1xm0s2E?ext=png"},
        {name: "0euvre-FirstGen #36 of 999", image_url: "https://www.arweave.net/-6RKsbyc23MnFlBN1ai5mu5YikmLiWD9tBBWMXJpyJE?ext=png"},
        {name: "0euvre-FirstGen #81 of 999", image_url: "https://www.arweave.net/6jlrXT1mKvMxzhQy5vypHko-EOvZoGJppJ7hd5-TEZw?ext=png"}
    ],"slumcat": [
        {name: "SlumCat #2376", image_url: "https://www.arweave.net/VxqOgZz4nUeQKNcL-Koj33Bh2C9Z2wWHp_ykPxCRsS0?ext=png"},
        {name: "SlumCat #111", image_url: "https://www.arweave.net/d98eX9RUEHlijKIQcw99NzrHSXBpFao9AAWE52EHrbI?ext=png"},
        {name: "SlumCat #2766", image_url: "https://www.arweave.net/q-77thLQd3JluMYkjta19K9SKgB6MVBBh3j4Vg_g-PI?ext=png"},
        {name: "SlumCat #5399", image_url: "https://www.arweave.net/1ZZkEyWJ0TMgGYKowhubHYAKm3DEpG8yjWEFqVgask4?ext=png"}
    ],"pixelracersgen1engines": [
        {name: "Pixel Racers Engine #930", image_url: "https://www.arweave.net/dlgU_HD4dATXgzOPgeFD-b3bR0D-WaEr3EZgQVTVHNo"},
        {name: "Pixel Racers Engine #8313", image_url: "https://www.arweave.net/y16CNrayjfRpydKRwteXA6P58Mj65W0etPBiRu1WdP4"},
        {name: "Pixel Racers Engine #14262", image_url: "https://www.arweave.net/t7UZJKRdgBe5lmVFxF5xfGtpaIG3FwAyGvsKGsJRe7Y"},
        {name: "Pixel Racers Engine #1542", image_url: "https://www.arweave.net/U8A8BWBuosSJRAw3DbWzEyq3bkgUq2EDIYJNNh-G1W0"}
    ],"bossbullsclub": [
        {name: "Boss Bulls Club #4360", image_url: "https://www.arweave.net/xdmtw_-x3F2PPrOtTLm7Uxq91gfaIsnB3AmndgT289I?ext=png"},
        {name: "Boss Bulls Club #5874", image_url: "https://www.arweave.net/amG9fObftjLW_aTM7HauJ7LfHf1uRAQ2S6r3ThuCN3o?ext=png"},
        {name: "Boss Bulls Club #8534", image_url: "https://www.arweave.net/3-s9rP0mbA8piGUSpyogNwnjzrQJAhM6vLO7WcVdYis?ext=png"},
        {name: "Boss Bulls Club #5393", image_url: "https://www.arweave.net/8LWf2eHIZ88mwTpRMGCLKgrB07sxiIVd84bdQ1E_azY?ext=png"}
    ],"solcapys": [
        {name: "capys 2485", image_url: "https://www.arweave.net/tGpuSmeiExQd8O_RbQRfcaCP58n2Re_pY--fnRC5ncw?ext=png"},
        {name: "capys 3307", image_url: "https://www.arweave.net/dcieTNf6WmoRqVVltRbQxvEF3IV277lpmWm92eG5lt0?ext=png"},
        {name: "capys 2634", image_url: "https://www.arweave.net/_YAD7WKsBegWd5-B85_pXV0k0xNDy6f2LXsmMKVeh6c?ext=png"},
        {name: "capys 2854", image_url: "https://www.arweave.net/b8xv1-w0ZxDHjykm-rIiw8lrjZ8EkljQA5B9JDXYgi0?ext=png"}
    ],"theinfungibles": [
        {name: "The Infungibles #6734", image_url: "https://infungibles.io/si/6734.png"},
        {name: "The Infungibles #2160", image_url: "https://infungibles.io/si/2160.png"},
        {name: "The Infungibles #1229", image_url: "https://infungibles.io/si/1229.png"},
        {name: "The Infungibles #1618", image_url: "https://infungibles.io/si/1618.png"}
    ],"cyborgiguanas": [
        {name: " Cyborg Iguana #1915", image_url: "https://www.arweave.net/yhtl9h-oH8w_mLpkrfXBm9elzE7wlx99GW9MU9HHxbU?ext=png"},
        {name: " Cyborg Iguana #1231", image_url: "https://www.arweave.net/lKjhmZcat9_gfZVnRW_5SknGGcI7rCrSaJMw21DNjHA?ext=png"},
        {name: " Cyborg Iguana #2093", image_url: "https://www.arweave.net/tFHqbFq1HDLXpYPkICAftsZvsJzdzfyQle8dukR7gw4?ext=png"},
        {name: " Cyborg Iguana #198", image_url: "https://www.arweave.net/TM3z6kWGYPd9ng6yxLKZkya0on55WguXoZD-fNhUAiA?ext=png"}
    ],"belugie": [
        {name: "Belugie #5133", image_url: "https://www.arweave.net/TzrMSFPGeuO9sGTUtC_JiJlfuNek3sPpqTcuI1v12Qs?ext=png"},
        {name: "Belugie #6777", image_url: "https://www.arweave.net/_g7wuDIjPMDJhBJMbQZdDX88EXH2NoY-diXQKDWibYg?ext=png"},
        {name: "Belugie #4362", image_url: "https://www.arweave.net/_Fm9J7cD6nUMzhXtgwSduqIlkcpCD6R9UIHJkUbF51c?ext=png"},
        {name: "Belugie #1432", image_url: "https://www.arweave.net/scnQpqYH1pnPUBjMa7X5Ost7PWVuI_Csz0uzLvgU188?ext=png"}
    ],"solanahodlwhales": [
        {name: "Solana HODL Whales #2574", image_url: "https://www.arweave.net/vewLRrMSAZPyIMF0_YiXM2VjJ3HUsPl-pBJCuKB0g4E?ext=png"},
        {name: "Solana HODL Whales #2913", image_url: "https://www.arweave.net/S5zrvo9UG57av7l0tIfTRqnYSOxkF9q-M3BUUJ1lctk?ext=png"},
        {name: "Solana HODL Whales #668", image_url: "https://www.arweave.net/NdiIFckdpj8-nicNWLUEEw4jgUiNXEs2SzAJMqBxPDo?ext=png"},
        {name: "Solana HODL Whales #2351", image_url: "https://www.arweave.net/O9_HAyP-lSWPcOBrOako0Yd5S_kgilTg23MpB1Q_Gdw?ext=png"}
    ],"suchshibas": [
        {name: "Shiba 0154", image_url: "https://www.arweave.net/r_a4knf3G79468wYwH6hNMGfVDIfeO5nBHbWSmvRtBk?ext=png"},
        {name: "Shiba 8239", image_url: "https://www.arweave.net/JWiKxGh66qxDDOqqEb5xM3NupQx5jOsnZifbSfD2c2U?ext=png"},
        {name: "Shiba 3123", image_url: "https://www.arweave.net/6RYSwP6b6xSPEiUVbBq3JjFTtQX9XO5GK7KxP2ERFD0?ext=png"},
        {name: "Shiba 6899", image_url: "https://www.arweave.net/SHROVOaGl54lZYPvAi61PuP2_bWQmiE_GMbUnwMRMLk?ext=png"}
    ],"theloftsbusinessclub": [
        {name: "Premium access #96", image_url: "https://arweave.net/n2KTKF6ZwT25x5SVslCvDWfUyBDZPlJhXrfp3Ub5kQU"},
        {name: "Standard access #1966", image_url: "https://arweave.net/CqDOxE1NjDtXxdS8NwEkb7tLSrtaqo4GioO4eUK8ClE"},
        {name: "Standard access #2592", image_url: "https://arweave.net/zReqAxVpuymDlpTXZx_ub8ixLN36qPayrztJsgk5QQM"},
        {name: "Standard access #1898", image_url: "https://arweave.net/cvMZ8UV_YNkrO25u5O0ZXRktVY0w1QfUWtkV0ANH7eU"}
    ],"soulless": [
        {name: "Soulless #3821", image_url: "https://www.arweave.net/QeLv4WdA3_ji_AliSFnSdviZhktHSTP_X-nfhP00-Ds?ext=png"},
        {name: "Soulless #7582", image_url: "https://www.arweave.net/G5_JQ4qpEz0dmpxd25ZHAUJKM5GF5ZhcsiwR6vFdKYg?ext=png"},
        {name: "Soulless #8663", image_url: "https://www.arweave.net/C7T9w8_zCobProXooxBzJFqdN60yp9P4Kr_SIxRdiPc?ext=png"},
        {name: "Soulless #5473", image_url: "https://www.arweave.net/SdBs0n70a3Aie-UWz2a7IAJ8L_I3ZaZJNSTLHO7iOIk?ext=png"}
    ],"yakuengineering": [
        {name: "Yaku Engineering ONI S-01 #1573", image_url: "https://arweave.net/x1rRMj5KhOnmzOB6nauqKnFmJB6k2Pt4c05zH7STVnY"},
        {name: "Yaku Engineering ONI S-01 #5616", image_url: "https://arweave.net/nOhi6HzVffIIAeNgib86VGTJhM1aHEgHrRjo-jRDzgs"},
        {name: "Yaku Engineering ONI S-01 #763", image_url: "https://arweave.net/Y3QMjcAdwyAszRyUXHfu7QsQVamCa-c7nmsoWUsOxfk"},
        {name: "Yaku Engineering ONI S-01 #1941", image_url: "https://arweave.net/5Lo7AEKT8GFDkIx9siBLfStatJlpzYP4zDUQwMqZLWk"}
    ],"boredapesolanaclub": [
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmR4KDfrwvUyVcpxASCrNReEZmqXq4VpzwhJ1Tzy2K17b9/4562.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmR4KDfrwvUyVcpxASCrNReEZmqXq4VpzwhJ1Tzy2K17b9/2275.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmR4KDfrwvUyVcpxASCrNReEZmqXq4VpzwhJ1Tzy2K17b9/4025.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmR4KDfrwvUyVcpxASCrNReEZmqXq4VpzwhJ1Tzy2K17b9/2854.png"}
    ],"3dmouse": [
        {name: "MOUSE  #116", image_url: "https://www.arweave.net/aFuiqgzm_dLU3h2FwBAGjV8HlAy1tfW4W_Op3tJqebo?ext=png"},
        {name: "MOUSE  #532", image_url: "https://www.arweave.net/lXfqyHywooY7suAD7Xd7ZqpS9VmoCLuIUi6ut9xc4WQ?ext=png"},
        {name: "MOUSE  #331", image_url: "https://www.arweave.net/_QIUmq7h2tHa9FgayX_6dC3TIA8HSGcFAmHx1F_HZVU?ext=png"},
        {name: "MOUSE  #046", image_url: "https://www.arweave.net/ffddKX6xmHnLFFukWIcWUVAuYJmrOzCXWdh0LYR1bWE?ext=png"}
    ],"maushesclub": [
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmNw4Ntn3aEx4NBdK3RvZC3Ygd1bdePDzPYYVhTWgBRvcy/315.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmNw4Ntn3aEx4NBdK3RvZC3Ygd1bdePDzPYYVhTWgBRvcy/221.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmNw4Ntn3aEx4NBdK3RvZC3Ygd1bdePDzPYYVhTWgBRvcy/92.png"},
        {name: "", image_url: "https://testlaunchmynft.mypinata.cloud/ipfs/QmNw4Ntn3aEx4NBdK3RvZC3Ygd1bdePDzPYYVhTWgBRvcy/342.png"}
    ],"diamondbaepe": [
        {name: "Diamond Baepe #1970", image_url: "https://arweave.net/0i0b92wlKikYj-HVh24BKCngk1kRnrTBSnRFNQ-yAKk"},
        {name: "Diamond Baepe #10", image_url: "https://arweave.net/eo34PZwhHZFUuIUjnctvOtmkAxVHRfcjQIW6-UB4Un8"},
        {name: "Diamond Baepe #798", image_url: "https://arweave.net/Z9LJembjvIHs7g1lbob-SMKVxheS4o5LH-hXek0fbEw"},
        {name: "Diamond Baepe #1018", image_url: "https://arweave.net/SM8-IVn471zp6aD-tL6KAkv55KdJ5xScFcX3ZpcUUgg"}
    ],"mousefaces1": [
        {name: "MOUSE #077", image_url: "https://www.arweave.net/E-GoiXt2jBBNTTzBN-zhp5GL2kjt2JyvCS2zE699M4A?ext=png"},
        {name: "MOUSE #067", image_url: "https://www.arweave.net/ZQsZL_SQLuf6_UhRBEsIr5rcx5NBJwm74p6vMQxx1w4?ext=png"},
        {name: "MOUSE #175", image_url: "https://www.arweave.net/f4I2dZEFDtHcD7CGx9PfyMEBTmEeX2yv2-2v57-W6mU?ext=png"},
        {name: "MOUSE #046", image_url: "https://www.arweave.net/UyZ_uWdgvKpysFc-iDady49KQEpL-UF7lOHv9VEFSiE?ext=png"}
    ],"toonwabbits": [
        {name: "Toon Wabbits #1891", image_url: "https://ipfs.io/ipfs/QmQycZqkdBUKMbeELpPq4VnD5ofWKjmzXw3R5JARSsEHan"},
        {name: "Toon Wabbits #1779", image_url: "https://ipfs.io/ipfs/QmTFKAwzf1HC5nTrXkPJcyVumzzSHyzWyVtctcGwhcRRZb"},
        {name: "Toon Wabbits #2140", image_url: "https://ipfs.io/ipfs/QmYF5gnF9HtbZmcBMkMkaPEhS4b7xeNwTu2ZLeGi6gt6dw"},
        {name: "Toon Wabbits #1365", image_url: "https://ipfs.io/ipfs/QmWeEktdytD4jXoTkUzSm38om97JV8KEyZsmQA9scSt7Xb"}
    ],"mousefaces2": [
        {name: "MOUSE #006", image_url: "https://www.arweave.net/igjRwYpf7Be8_Ul6oZvk0ANFYhbrzqgLtS6xZU1z4Eo?ext=png"},
        {name: "MOUSE #044", image_url: "https://www.arweave.net/a8mqgU_hZ-9yanlqEcqIL6_PQgTJJEPWix-E8B31wok?ext=png"},
        {name: "MOUSE #125", image_url: "https://www.arweave.net/mnNxcTZu3N213PdwOMrO2T-UZCLIF8XswVpQGPr16UU?ext=png"},
        {name: "MOUSE #059", image_url: "https://www.arweave.net/Hm6o0qZd-uvtsUru0lTwCZAFvnqNf2qh5tot_rObEGQ?ext=png"}
    ],"nftreesolana": [
        {name: "NFTree #2799", image_url: "https://www.arweave.net/WdVl98b_in1yDUD105eAgnF9OjtUXs_YOz0fxnZJ3R8?ext=png"},
        {name: "NFTree #3531", image_url: "https://www.arweave.net/pgrX5WV-LfBndjueRIJXLKgUpfIT5fX1CYZh354CP3s?ext=png"},
        {name: "NFTree #4038", image_url: "https://www.arweave.net/FOxd4K8AOXoJ4BHNyP0BpHVQ-JxQOI1nQIahoPerlKI?ext=png"},
        {name: "NFTree #4092", image_url: "https://www.arweave.net/JTiYvFqgcsbj2MeFXcDw-fCLQJdvuwoGEkkhl7kA-Bo?ext=png"}
    ],"boopiegen1n": [
        {name: "Boopie Gen 1N #899", image_url: "https://arweave.net/S8Z5GgTzqP_uT_j3MTraJR3-Sy-QDlvE94KM58-e5Eg"},
        {name: "Boopie Gen 1N #827", image_url: "https://www.arweave.net/KAtHhlEDCVzUtytioyPr_at51q8q_UJ7CP11hmab-NM?ext=png"},
        {name: "Boopie Gen 1N #1911", image_url: "https://www.arweave.net/zWRhqN-R8etCEfO2V5iCHy3q6pcmEXVg55TN_0T4YXg?ext=png"},
        {name: "Boopie Gen 1N #2112", image_url: "https://www.arweave.net/vnb4h1KUbMfKqnDf49O2HNLtikiSdhpF8VK__-udR20?ext=png"}
    ],"astralhouses": [
        {name: "Astral House #7470", image_url: "https://arweave.net/pTRwNm619Oj_F4zmRVWMlGg31d3g6YlXTty1L0yCLXk"},
        {name: "Astral House #3545", image_url: "https://arweave.net/HSZY6M9owKaPhP-6khdIYHLz8ELQ61U3qDhVtzZd-RU"},
        {name: "Astral House #6273", image_url: "https://arweave.net/_6mLvTqhVYtlfYv0YKqD0Fy8_6a27qnYF35yBRNgbiw"},
        {name: "Astral House #1137", image_url: "https://arweave.net/kRt-qbZH1LCjbq_KSWxRcwwxnVAn8v-QgloMgboLGH4"}
    ],"solgods": [
        {name: "SOLGods 268", image_url: "https://www.arweave.net/5sQuZoPJTdXxV6JM29-CdQZqTyDCNHCDsF-agzTJkH8?ext=png"},
        {name: "SOLGods 5937", image_url: "https://www.arweave.net/jrLu3ZFfbtgEXPBeoO2I3qo0NWp85N2qhGFckj-cMoQ?ext=png"},
        {name: "SOLGods 6288", image_url: "https://www.arweave.net/TAfCbPc03bS-RToYEZ0WwPIFoTBCG9m2P7zpq1a2vU0?ext=png"},
        {name: "SOLGods 4466", image_url: "https://www.arweave.net/Dec7huwyl20ox2Z3isPOyEEkQ-Ec_rxJK1jgaKG6Clk?ext=png"}
    ],"pixeldrugs": [
        {name: "Pixel Drugs #9", image_url: "https://www.arweave.net/nk8wX_mQ5qrmb0fkcGgmaPje__l-6fct6bxoaFKABUM?ext=png"},
        {name: "Pixel Drugs #336", image_url: "https://www.arweave.net/EVsF_CMM5vLnEqu4hsnxA9zptN1Ln3KfwoM5W2N37Jw?ext=png"},
        {name: "Pixel Drugs #397", image_url: "https://www.arweave.net/w785qmWvPwZ0x23p6br-xLeOVok3OP60d5BtjPgHo8o?ext=png"},
        {name: "Pixel Drugs #138", image_url: "https://www.arweave.net/HfyOode5PknH03wmXZi4cY-9aEEERJUC4AL3D4qkK5k?ext=png"}
    ],"angomon": [
        {name: "Angomon #3400", image_url: "https://www.arweave.net/l45GUvZ5O3rT_E1LCKseK2RYIyvy78eN2ClYFchpSII?ext=png"},
        {name: "Angomon #3250", image_url: "https://www.arweave.net/yamQkaIPEp9oIWd8Z2Ia8_dYtjyEftMUFKrRIhhsgmQ?ext=png"},
        {name: "Angomon #1503", image_url: "https://www.arweave.net/dClwvGfMf669vIuZKfD1ATaQmvTRV8vs5FHGECfUTy4?ext=png"},
        {name: "Angomon #2557", image_url: "https://www.arweave.net/o1t9UogH84Q47JQbhFRcOnX--nH9x1c86Aqr8u2vJCA?ext=png"}
    ],"nftabs": [
        {name: "NFTab #3408", image_url: "https://www.arweave.net/QRr_7XASS4Fxh4RyczUT52LmrBkguSR1zIzsd6HKZpY?ext=png"},
        {name: "NFTab #3202", image_url: "https://www.arweave.net/6FXN9DZ1gWqc4sVexeDjU6tgI-sDLCejGfPOA2l9TL8?ext=png"},
        {name: "NFTab #4873", image_url: "https://www.arweave.net/lSUjkbL30S5TmxMo_gGVXFgQYIl8wuwE-CJ8ur-byss?ext=png"},
        {name: "NFTab #1054", image_url: "https://www.arweave.net/NBUL2TlZPkshzYTm05--gWHl7wT_JJans9x2c7ynyz0?ext=png"}
    ],"astralbabyapes": [
        {name: "Astral Baby Ape Club #3590", image_url: "https://bafybeihjqgz5cuicehw4ugbs6og2nibswevjw34rai7ilitf3tldsqqdq4.ipfs.dweb.link/3590.png"},
        {name: "Astral Baby Ape Club #1618", image_url: "https://bafybeicni6nbot77etz3jgejc3o7zp43x3w3orny6ongnce2vlfh55pvn4.ipfs.dweb.link/1618.png"},
        {name: "Astral Baby Ape Club #596", image_url: "https://bafybeihsnwjolsehdrtcb35cmbb4grrqq5fqfgk7uvgssu6hpny4tynf4m.ipfs.dweb.link/596.png"},
        {name: "Astral Baby Ape Club #2957", image_url: "https://bafybeie3ovoibgtindortu4w7q2h6sh43di7ms75z5hocsjpzb75a7fcce.ipfs.dweb.link/2957.png"}
    ],"danukidojo": [
        {name: "3570", image_url: "https://www.arweave.net/12lsO1GmUHcUfFjZMo0oAcCyfB79kxl0pbMbG7_rm3g?ext=png"},
        {name: "4177", image_url: "https://www.arweave.net/2KAFqvTIRuS4XrBquJh6oXQwpIFhnKS8FRKyIeM9q7w?ext=png"},
        {name: "3967", image_url: "https://www.arweave.net/KkYLF6N_o-eAhSyLX-ns6fj43nc1tJON660drA8rrJM?ext=png"},
        {name: "1001", image_url: "https://www.arweave.net/pAXN0YHfwtvjR23sM2Yc8sKbHhvx9NbgeScKrGoEN9M?ext=png"}
    ],"angrybunnyclub": [
        {name: "Bunny #4510", image_url: "https://www.arweave.net/x17cDDp8uaNwD-fy94plp-mjnfFa8cFieiciL-qT_yo?ext=png"},
        {name: "Bunny #3653", image_url: "https://www.arweave.net/vx9xSaOHZKWY3qQVvk1TDfP1F7f3IdIN1To2o4Z_3E0?ext=png"},
        {name: "Bunny #1301", image_url: "https://www.arweave.net/ACMZpzN8mKqfGf7zEsf7BZ5epXULB95KQSo9PBv4ggY?ext=png"},
        {name: "Bunny #4732", image_url: "https://www.arweave.net/orxOOagKJgDKAaR7I7zNnKX9qPI5D8-JvuL9tPvAbGI?ext=png"}
    ],"munkhoag": [
        {name: "Munk #3900", image_url: "https://www.arweave.net/We22Js7NQj7ZHOieyua1esgJyORlrJfjwcyQhb0Rqns?ext=png"},
        {name: "Munk #1722", image_url: "https://www.arweave.net/uYKLpBTJodsXYqZWg3coCC3SH2j4PJeJ0cSG6gnQdMk?ext=png"},
        {name: "Munk #712", image_url: "https://www.arweave.net/n-3H7rB7viU1DlcgnkVTw_GijeeOWDC1yMdDaZ3jr2k?ext=png"},
        {name: "Munk #2549", image_url: "https://www.arweave.net/7FRG-8HvL2i7sR1X-i_-Q9s06SJUdF73pmEVB6nLhQs?ext=png"}
    ],"mutantdinobeachclub": [
        {name: "Mutant Dino Beach Club #7990", image_url: "https://www.arweave.net/WBOLXMsaRDKkmtbfUL6H0hU05CzVQhPnOYscUfUezdc?ext=png"},
        {name: "Mutant Dino Beach Club #6058", image_url: "https://www.arweave.net/W5u_tXWNxSvwDezVyDbxDW12F3fETYEuPerL5SVaBkw?ext=png"},
        {name: "Mutant Dino Beach Club #5971", image_url: "https://www.arweave.net/Kz031aVUe5JVVjqWLICUXPZWn3oYSzvc95Ry3xnYHpU?ext=png"},
        {name: "Mutant Dino Beach Club #6658", image_url: "https://www.arweave.net/cEVDwDrL3yqTJA6fCqVcuSCOmOgYRs7GZRbLnRV_G-A?ext=png"}
    ],"thesuitesnft": [
        {name: "Club Suite #2139", image_url: "https://bafybeig4norc5leonf5ebmrfgwlltguia4jipnrpoks5wiup6koxqe7qoe.ipfs.dweb.link/0.jpg"},
        {name: "Club Suite #4064", image_url: "https://bafybeig4norc5leonf5ebmrfgwlltguia4jipnrpoks5wiup6koxqe7qoe.ipfs.dweb.link/0.jpg"},
        {name: "Club Suite #1029", image_url: "https://bafybeig4norc5leonf5ebmrfgwlltguia4jipnrpoks5wiup6koxqe7qoe.ipfs.dweb.link/0.jpg"},
        {name: "Club Suite #4515", image_url: "https://bafybeig4norc5leonf5ebmrfgwlltguia4jipnrpoks5wiup6koxqe7qoe.ipfs.dweb.link/0.jpg"}
    ],"psyshrooms": [
        {name: "PsyShrooms #1059", image_url: "https://arweave.net/YeY_aOs6Lh3-mBHr6aXwxSHZ6jfVYeBMvj2lhkZfZHw"},
        {name: "PsyShrooms #894", image_url: "https://arweave.net/HK70B5gZZ7_Dcoa-8EnL62l1kTRe-dMSubCZdHjRgbg"},
        {name: "PsyShrooms #1330", image_url: "https://arweave.net/MjKmj0N85nr7yVdgVimRUrDLq9p8v6iQ-DMDCbDUa7w"},
        {name: "PsyShrooms #1514", image_url: "https://arweave.net/sm_EdHvy4PM7Ab8lg9gTF2aNe5RyuvBr3N7me3PD9k0"}
    ],"sockpass": [
        {name: "Sockpass #7637", image_url: "https://arweave.net/bJK7GtnsItZxo35lNKMuBX5iNBC_t1J18i3N3PFZlKo?ext=gif"},
        {name: "Sockpass #4828", image_url: "https://arweave.net/bJK7GtnsItZxo35lNKMuBX5iNBC_t1J18i3N3PFZlKo?ext=gif"},
        {name: "Sockpass #3046", image_url: "https://arweave.net/bJK7GtnsItZxo35lNKMuBX5iNBC_t1J18i3N3PFZlKo?ext=gif"},
        {name: "Sockpass #2788", image_url: "https://arweave.net/bJK7GtnsItZxo35lNKMuBX5iNBC_t1J18i3N3PFZlKo?ext=gif"}
    ],"degenlizzy": [
        {name: "Degen Lizzy #9392", image_url: "https://www.arweave.net/kIyFhIRIQtcc0YpKvqMASm8IXLaiuIObOgieM5lOIzA?ext=png"},
        {name: "Degen Lizzy #9066", image_url: "https://www.arweave.net/r0Gz0SIhunvXwLGe7EZcD_7dY3A-1TnD_jba7RH9CaU?ext=png"},
        {name: "Degen Lizzy #6660", image_url: "https://www.arweave.net/R-pcki9meLt0hGq9qV9VdmQROkCo1ly2hoWR1SkHGJU?ext=png"},
        {name: "Degen Lizzy #3419", image_url: "https://www.arweave.net/LiQpw-aNtrJh9iBSxukEwffTteOyM9P8g9A-S4a_Kuw?ext=png"}
    ],"starbotsgame": [
        {name: "Starbots #3330", image_url: "https://bafybeibpqbfizkd4o74vaanugbbp3ysqiy3ohhfcne7wgyyau2r4jf77o4.ipfs.dweb.link/3329.png?ext=png"},
        {name: "Starbots #1037", image_url: "https://bafybeihq3tntn5gl6m5nnaanobh7egns7r7qoncidu536mjnxbk3qtfyl4.ipfs.dweb.link/1036.png?ext=png"},
        {name: "Starbots #3008", image_url: "https://bafybeig6pfezlbe7i6skadoxba7qegohfq4h4y66onb3axcity7oabobdm.ipfs.dweb.link/3007.png?ext=png"},
        {name: "Starbots #5701", image_url: "https://bafybeidkpstbbt3ayaqext5i3q35ylzqkcjhnimzfja7ywz6m3gh3ho634.ipfs.dweb.link/5700.png?ext=png"}
    ],"sigmasharks": [
        {name: "Sigma Shark #5475", image_url: "https://www.arweave.net/PaxotMVLwccDaukKSpAOGdwRR13nqIBKVJ8srlyV7hA?ext=png"},
        {name: "Sigma Shark #1784", image_url: "https://www.arweave.net/4CpxXOSHcv-zl2sdNmVO84PuUCXB03I2AY-jUR1mZPM?ext=png"},
        {name: "Sigma Shark #1029", image_url: "https://www.arweave.net/VMZQgugYIIZ3iNslhj6J-q-PIw63frJNqwNAHvs859Y?ext=png"},
        {name: "Sigma Shark #7072", image_url: "https://www.arweave.net/B1M0er17nFkL6Si2Sz4tJ9V_jyOgaeWsX2GwaBbqPvg?ext=png"}
    ],"skellies": [
        {name: "Skellies #1348", image_url: "https://www.arweave.net/-v6MR0UoPDdm7cllf9EwEenncCr3mMl-fflDj6bU4Cg?ext=png"},
        {name: "Skellies #7272", image_url: "https://www.arweave.net/tb3aF-N7xt9g94fKp-zvjvLEQeDwfyT0TQMkjIoCVO4?ext=png"},
        {name: "Skellies #3615", image_url: "https://www.arweave.net/GWE_vmytJKA7rUfJN25VvvVJIPP6kHhdenuBQ0T8JMQ?ext=png"},
        {name: "Skellies #6045", image_url: "https://www.arweave.net/mSA49MtVPWXP2w772H6TBEZULgB24_3GU5AW-ije3MQ?ext=png"}
    ],"zillavskong": [
        {name: "Zilla Vs Kong #848", image_url: "https://www.arweave.net/63tQ5X5Xt0tmqCcWQKJ7x62NTBalmxfr3g-4k5y2HjY?ext=png"},
        {name: "Zilla Vs Kong #325", image_url: "https://www.arweave.net/gDwN1_K4JWtvmC3M9LvjJusEW8yQrJdSZE9-hdeBc5c?ext=png"},
        {name: "Zilla Vs Kong #18", image_url: "https://www.arweave.net/7rx0l9Jf4VDwsKEvE6kzuwr1TWWj89wpOB2GiIx8kLo?ext=png"},
        {name: "Zilla Vs Kong #812", image_url: "https://www.arweave.net/jeakstH3RIgGeHE6GNcTpUMA5o1fEjKnNEWgqdl6ubI?ext=png"}
    ],"magicdao": [
        {name: " Normie", image_url: "https://bafybeihr7vi77syiup5o4avvzemhlp4v4nplpc23haderjcjkkzgah2a5u.ipfs.dweb.link/0.gif?ext=gif:Magic Ticket"},
        {name: " Normie", image_url: "https://bafybeihr7vi77syiup5o4avvzemhlp4v4nplpc23haderjcjkkzgah2a5u.ipfs.dweb.link/0.gif?ext=gif:Magic Ticket"},
        {name: " Normie", image_url: "https://bafybeihr7vi77syiup5o4avvzemhlp4v4nplpc23haderjcjkkzgah2a5u.ipfs.dweb.link/0.gif?ext=gif:Magic Ticket"},
        {name: " Normie", image_url: "https://bafybeihr7vi77syiup5o4avvzemhlp4v4nplpc23haderjcjkkzgah2a5u.ipfs.dweb.link/0.gif?ext=gif:Magic Ticket"}
    ],"bitbirdz": [
        {name: "Bit Birdz #1381", image_url: "https://www.arweave.net/KW7EB00MA6k5xb4RZ3E5huPh7HBdnv4qbr4aJOA9rw0?ext=png"},
        {name: "Bit Birdz #1526", image_url: "https://www.arweave.net/qv8uvOR91SsZj4dvzI-ViSgOBi4Gh4BCrSPPd_60xQM?ext=png"},
        {name: "Bit Birdz #2139", image_url: "https://www.arweave.net/2Gl456xaipQXwWwjrPvedrUojqfgnsgawyXZ9kw9RZY?ext=png"},
        {name: "Bit Birdz #1871", image_url: "https://www.arweave.net/754wyEWTyje-cnnbj5CQV-vn5vTdmhlfSY6Re72aBPI?ext=png"}
    ],"creepygirl": [
        {name: "CreepyGirl #2503", image_url: "https://www.arweave.net/PnN-zR8hsbYrtSXktIyayt1nU2q5br0NlfCBP7dOexM?ext=png"},
        {name: "CreepyGirl #2657", image_url: "https://www.arweave.net/tL3sn4FJ_y-aVOnmxnrVa9KlZakn_aHCId2rBLKSbhI?ext=png"},
        {name: "CreepyGirl #2379", image_url: "https://www.arweave.net/i-k8ApEET3DaxLHkJCQl-MCnn64XzSPQMgRNVvWTPp4?ext=png"},
        {name: "CreepyGirl #2497", image_url: "https://www.arweave.net/ZbiVDGCzSjDU4VXck6LeF-flOGVApvGw5thFjXEHKJs?ext=png"}
    ],"citizensbysolstead": [
        {name: "Citizens 3#673", image_url: "https://arweave.net/zeV-OV-HMYmFvOhzydG2fZUCgIarWNqN58D2cYK-iTg"},
        {name: "Citizens 3#713", image_url: "https://arweave.net/w-QKqg9u_LkcbGp6SfJUb3sqv5np6teNHOAs9yIyqnQ"},
        {name: "Citizens 3#847", image_url: "https://arweave.net/tQNESXW4Y2CJJuWS8u3gJ-p5xzttKRwY2De-EQ4HovM"},
        {name: "Citizens 3#979", image_url: "https://arweave.net/c4b7WF_kCDrLEZtV4swVn09QZWPrfZjVvwbGFAXC7ew"}
    ],"solanadquirrel": [
        {name: "Solana Squirrel #1449", image_url: "https://www.arweave.net/pgsUC5-eldA8l6b2Wp-OP_5OQ_Urccs0v-kZjUkVCVw?ext=png"},
        {name: "Solana Squirrel #1574", image_url: "https://www.arweave.net/yG4vDVI9wIg5s4gmXADVGzArTo4rw_GI2dvniEnOvkY?ext=png"},
        {name: "Solana Squirrel #1053", image_url: "https://www.arweave.net/vuVa21DjZcx0oWRJEsp2lh5nQggtUQ_BMxIkuacdZOk?ext=png"},
        {name: "Solana Squirrel #1233", image_url: "https://www.arweave.net/xFQ3WjBljJZKTU3bu-iNxJG1L9uS-BN3S2EocQzLs74?ext=png"}
    ],"babyapesocialclub": [
        {name: "Baby Ape Social Club #1534", image_url: "https://sld-babyapes.s3.amazonaws.com/1534.png"},
        {name: "Baby Ape Social Club #1749", image_url: "https://sld-babyapes.s3.amazonaws.com/1749.png"},
        {name: "Baby Ape Social Club #1700", image_url: "https://sld-babyapes.s3.amazonaws.com/1700.png"},
        {name: "Baby Ape Social Club #3667", image_url: "https://sld-babyapes.s3.amazonaws.com/3667.png"}
    ],"metaforge": [
        {name: "Ghost Guy #1398", image_url: "https://bafybeihwpln32mkpnox3skurpwqy24u4h7lb7dfilre45narzwg2mwf2rm.ipfs.dweb.link/1077.png?ext=png"},
        {name: "Ghost Guy #753", image_url: "https://bafybeig5k7bhtfm6rw2bhgfbzcc5zop6dxzn3hf5n53m3fuawq63esjlaq.ipfs.dweb.link/432.png?ext=png"},
        {name: "Ghost Guy #1775", image_url: "https://bafybeiachamdhfvq45bo4kz2tivi5apksg2g37jsvtfgqy7bricfrgn6em.ipfs.dweb.link/1454.png?ext=png"},
        {name: "Ghost Guy #1059", image_url: "https://bafybeif2chnlxajaudzy3ciatmrjykdagifrans6l3hhmdpnvgfwqksggy.ipfs.dweb.link/738.png?ext=png"}
    ],"niftynanas": [
        {name: "Nifty Nanas #984", image_url: "https://www.arweave.net/Mj8agMO3wEmEcIwz4DK3PITlRYISwiqrHwgltuU4kco?ext=png"},
        {name: "Nifty Nanas #2908", image_url: "https://www.arweave.net/SuHb1Vbox8mFaUSIqHawKKiuMhg9LhFojR9_doDho9U?ext=png"},
        {name: "Nifty Nanas #3806", image_url: "https://www.arweave.net/7nx96_YN_5krGj6b3prl6HqrzEExP-Ncz9il_QXwO9A?ext=png"},
        {name: "Nifty Nanas #489", image_url: "https://www.arweave.net/pzZPYxPDh1be9vZwVbM0ZLPxKQ1IteUD0zrZ99KKzXU?ext=png"}
    ],"billionairebabymeerkatsclub": [
        {name: "BBMC #123", image_url: "https://arweave.net/_kGww11DYvpwxzjllJALLtEWwZkkbyHKp3JH_GlxtTE?ext=png"},
        {name: "BBMC #170", image_url: "https://arweave.net/6MJO2Sb19ssJ4QHs1eQsdqdEdkzE_nzQnx1IM1AgcLk?ext=png"},
        {name: "BBMC #73", image_url: "https://arweave.net/B364nR0eqz8WSGRtR4sM7LtGxlrXAMOgFn_Qy21GgZo?ext=png"},
        {name: "BBMC #222", image_url: "https://arweave.net/CxhDBRJcZ5-3XcQgmXBkVU_8yQVhQJ7-9y1NznAKgFI?ext=png"}
    ],"chickentribe": [
        {name: "ChickenTribe #2275", image_url: "https://www.arweave.net/QtE9BhRN4h2IHu6zPsUyZi3TUqVe1sc7vttGwzibvDg?ext=png"},
        {name: "ChickenTribe #532", image_url: "https://www.arweave.net/EtqV1At9inqHy0tpHYRajV7iAdkdQE6xYEdWs1nDeYM?ext=png"},
        {name: "ChickenTribe #2150", image_url: "https://www.arweave.net/3Qq0FvdslsBAQs43XGGb9Xv2p_sapnTlM1TYFOPddNI?ext=png"},
        {name: "ChickenTribe #1202", image_url: "https://www.arweave.net/Q8KMxnu9ojmyc4Y4CqoiEHrEbvPQOTa9u8A6IJDmWag?ext=png"}
    ],"boopiversethehistorians": [
        {name: "The Historians #2343", image_url: "https://www.arweave.net/fTsbWyo9dkvjFRWaKK-SBzZV8aPxHlf-lQU-_dvPLqs?ext=png"},
        {name: "The Historians #2594", image_url: "https://www.arweave.net/um-oeLoMz6U1s3FHwJMHGtS-cdvIFGR6OmHN5Qe0uaw?ext=png"},
        {name: "The Historians #2421", image_url: "https://www.arweave.net/4gU-4pun1ETZarOz14VFISeFyBTnentyyYqMJSyzoXY?ext=png"},
        {name: "The Historians #3717", image_url: "https://www.arweave.net/paBHGHNOyviRGf19-diYIKmCO1bKt9tF4uC6zvAm3vQ?ext=png"}
    ],"theoctos": [
        {name: "Octo #935", image_url: "https://arweave.net/yNLGHD59i7th6ls51FSs9jJFM8e3GYh9B-Rdce3Yos4"},
        {name: "Octo #3968", image_url: "https://arweave.net/n9oe5TgMPXMjPgnHF7Vop1iPw7Oy1JlK4409sQR9STI"},
        {name: "Octo #915", image_url: "https://arweave.net/rmb8vB0kTj8VtZgy90ev9Rwbvdj3mwn07GIMwOWHdN4"},
        {name: "Octo #3610", image_url: "https://arweave.net/GCy24rylBwtZSluLfje8qunq6dG1azW0fzFx4Sz9Tz8"}
    ],"saigowabbits": [
        {name: "Saigo Wabbits #160", image_url: "https://arweave.net/oiZh0-8jgQVXwKVeFEPllsCOn-gbi3C0CtnPuMYS9kU"},
        {name: "Saigo Wabbits #189", image_url: "https://arweave.net/Az_HazxFwMe-v7pL67axn7IqR7uEAmVF610iea7z-yM"},
        {name: "Saigo Wabbits #5", image_url: "https://arweave.net/ey3PbARE6E6dB7LaLUN8zi_zUbuMOwT-Kl_FvpR5Yuw"},
        {name: "Saigo Wabbits #139", image_url: "https://arweave.net/-BYF4mnt4bGwc1zJZgC-5qTceptLCw_5YJCDbSHDUQ8"}
    ],"dokanapes": [
        {name: "Ape #667", image_url: "https://www.arweave.net/TpBLBkFui91RKtO8xtwsewXWkX7kxVq7mUGIx9c7b9k?ext=gif"},
        {name: "Ape #578", image_url: "https://www.arweave.net/4TxKcQ2_E0ScGm83rxxvjMJWsN1QNoknaObDgV1O-HI?ext=png"},
        {name: "Ape #689", image_url: "https://www.arweave.net/vfEa2_20hEvXu98WTXAtJ465zKskmAc3du-k44SFEzM?ext=png"},
        {name: "Ape #244", image_url: "https://www.arweave.net/EKDWl4BwDsY8bjulLu4SsbhJSUQhid4Wo-p_IlXxvrM?ext=png"}
    ],"safaridition": [
        {name: "Safari Leopard #159", image_url: "https://www.arweave.net/WF7RNweDn8GVlLKhfBSlL5lXLuZHQ_xwhJFUeop6e6g?ext=png"},
        {name: "Safari Leopard #72", image_url: "https://www.arweave.net/oBXzlsBdNxeNhaiA7meePeAde-4o-aSMlz0TFbbOmKo?ext=png"},
        {name: "Safari Leopard #93", image_url: "https://www.arweave.net/sYMiAwST02626d9ngehMhx7dLx8cMRony_hLn1FA1bE?ext=png"},
        {name: "Safari Leopard #349", image_url: "https://www.arweave.net/EDCmfF52yjvr7Zyd8PYJO19Q0_xwF1hzJ4--hn0cE38?ext=png"}
    ],"geckos": [
        {name: "Galactic Gecko #1", image_url: "https://www.arweave.net/Ior6LZNV1rbtrqV3nxETbNQYjQgwxwZ3XeztJxd7aQ0?ext=jpeg"},
        {name: "Galactic Gecko #2", image_url: "https://www.arweave.net/GBVR-OgsO4vtf8CYZBgK5PV8ee_uyDtKi-Va1P0VNBo?ext=jpeg"},
        {name: "Galactic Gecko #3", image_url: "https://www.arweave.net/jezCEyTABQlhpc2P6gsoLhhVo-UuxhcdgvZe5mZe6V8?ext=jpeg"},
        {name: "Galactic Gecko #4", image_url: "https://www.arweave.net/_qfDJDPRtyhbv2_iXTDsnhWo31UFLLMtBAsmCoCtWx4?ext=jpeg"}
    ],"pixsols": [
        {name: "Pixsol #82", image_url: "https://www.arweave.net/adqe9cD6a55LMaGn2vaVak2Y6TgFn5XrGIYgdSxbPxI?ext=png"},
        {name: "Pixsol #102", image_url: "https://www.arweave.net/WNsr9pkLlINYGogPOHNSpPXkxJuBIoltjhqN42lCEiQ?ext=png"},
        {name: "Pixsol #87", image_url: "https://www.arweave.net/1QpPeE2mv2eFUrEMc86_yeVcUdRQatnBL6ptddTxTDY?ext=png"},
        {name: "Pixsol #88", image_url: "https://www.arweave.net/VjCdp_WzEIXQpLHDWbcCAQWh54SceNyUjXZUO2_hnrM?ext=png"}
    ],"magicpeach": [
        {name: "Magic Peach #774", image_url: "https://arweave.net/SLVhnJHwtBbYR2IMgFPxUTXYXuuXsb1qRNcEAeP2p_E"},
        {name: "Magic Peach #1848", image_url: "https://arweave.net/SLVhnJHwtBbYR2IMgFPxUTXYXuuXsb1qRNcEAeP2p_E"},
        {name: "Magic Peach #3253", image_url: "https://arweave.net/SLVhnJHwtBbYR2IMgFPxUTXYXuuXsb1qRNcEAeP2p_E"},
        {name: "Magic Peach #2945", image_url: "https://arweave.net/SLVhnJHwtBbYR2IMgFPxUTXYXuuXsb1qRNcEAeP2p_E"}
    ],"solsocks": [
        {name: "SolSock #340", image_url: "https://www.arweave.net/BhTzjfoipCugEB2DsQLTaHKfxf9w8-yTrfecpFNMnHs?ext=png"},
        {name: "SolSock #332", image_url: "https://www.arweave.net/_du2iTEYo50W_Xnr_iijGDGErbh6wfMt5Uz7ZXpPRj8?ext=png"},
        {name: "SolSock #325", image_url: "https://www.arweave.net/pfqKOCMnjdQcSvYT64-LWVLy2o4UtyPMtNOh4qSeU6w?ext=png"},
        {name: "SolSock #352", image_url: "https://www.arweave.net/mwDnsV7OaztHamxwWTJphnXkcKOmrD-1SUw973QB9TI?ext=png"}
    ],"elementartnft2d": [
        {name: "2D Automata #387", image_url: "https://www.arweave.net/0P4s4Bl33LWz9r8OCRUeAJtsx9VszbqzW5XVcL46p8w?ext=gif"},
        {name: "2D Automata #3968", image_url: "https://www.arweave.net/I46GX3t1VNp43nIoc64Y-UnwHdoWBR_ltc4jydepGt8?ext=png"},
        {name: "2D Automata #2216", image_url: "https://www.arweave.net/9vvoQTLF7M5E2e3qXaMAgN9XIny1d_PeZIz5eiaebqM?ext=png"},
        {name: "2D Automata #2314", image_url: "https://www.arweave.net/Hrstk_SrU-HZlNLBGwAYA5wqqdAimHuTVylhj-t0Y4Y?ext=png"}
    ],"proofofconsciousness": [
        {name: "Proof of Consciousness #1244", image_url: "https://bafybeig5dgxoauvtynhvrme7gofqdofp7wvn4df5erdglhmxazqtzzck4q.ipfs.dweb.link/994.png"},
        {name: "Proof of Consciousness #512", image_url: "https://bafybeifzboixpnaaicz6efpgyyjrf6cvfceat7esaegfwx6mwkpit44iku.ipfs.dweb.link/262.png"},
        {name: "Proof of Consciousness #1124", image_url: "https://bafybeihbfnbij2kfhrmyyojeskstnhoqex5gyp37vomumannpu5jypqoey.ipfs.dweb.link/874.png"},
        {name: "Proof of Consciousness #638", image_url: "https://bafybeihj3ccdomhuolsah7jg4gletjuvwpnhf6itkifdpcbp6aiufwq7bq.ipfs.dweb.link/388.png"}
    ],"pixelbands": [
        {name: "Pixel Bands #3737", image_url: "https://bafybeihykisqwqkjjtjnjf5vkmmuzuhqd6ut5wc5qavyeqf6u3zitgrlne.ipfs.dweb.link/3737.gif"},
        {name: "Pixel Bands #18", image_url: "https://bafybeibhaazwq4grmxeixvgdrnmbb6rstmhp2h5ggngbwzawe7uzhm2fh4.ipfs.dweb.link/18.gif"},
        {name: "Pixel Bands #820", image_url: "https://bafybeicdlhfrfy4olanutwadwc4igphscpiy5vaptmsxa4t72ubdbcgyaa.ipfs.dweb.link/820.gif"},
        {name: "Pixel Bands #2302", image_url: "https://bafybeicoc2r7sdntunr2xr7xuyreetgykcmaoaqikohjecj3m7yr7m6wla.ipfs.dweb.link/2302.gif"}
    ],"thefellowship": [
        {name: "OG Fellow #283", image_url: "https://www.arweave.net/aOWC7yOl7ibRjBvXB1CEovLGSFZPGJf5y0RRk6_B1CI?ext=png"},
        {name: "OG Fellow #1449", image_url: "https://www.arweave.net/8z5xS0yTXIiAONPQ9Ps1vnqdxZyNQ8EUsOEPIqOwIyQ?ext=png"},
        {name: "OG Fellow #936", image_url: "https://www.arweave.net/wWdBhA-01XgMzoj-qiy6XBOR2zeIua4TFVDdYlYffv8?ext=png"},
        {name: "OG Fellow #876", image_url: "https://www.arweave.net/hMCPrtYxES7PLVJ8IsebElhj7Dm-o1c688g3p4wO284?ext=png"}
    ],"messageparty": [
        {name: "First Verse #4495", image_url: "https://bafybeicfdzv3lqhidieu5h64n6bi3wvzfswopa45orkqzyjjag367fbexe.ipfs.dweb.link/4494.png?ext=png"},
        {name: "First Verse #2866", image_url: "https://bafybeiccwhqv2jryjkqluo3emf3wdoaystbjltpi26cadxr5qi4nvcsiwa.ipfs.dweb.link/2865.png?ext=png"},
        {name: "First Verse #414", image_url: "https://bafybeiawdzultsicdymmenshewy4ln7neeuulid73dp3wdvufvsq4wfjde.ipfs.dweb.link/414.png?ext=png"},
        {name: "First Verse #4320", image_url: "https://bafybeiayoxugp3zaeiiywuzmxaq7xuofjqxiqdnbovxeva3vaj5fo6dwoy.ipfs.dweb.link/4319.png?ext=png"}
    ],"boryokudragonz": [
        {name: "Boryoku Dragonz #42", image_url: "https://arweave.net/HcAFTR4EJoujYt4g_0etITbpSeje5ctx4ugLNVsSLO4?ext=png"},
        {name: "Boryoku Dragonz #122", image_url: "https://arweave.net/VZzxAAh8xEuwfLiH-nbjY1Op9DnX233OqzNciDofgqs?ext=png"},
        {name: "Boryoku Dragonz #775", image_url: "https://arweave.net/RP3FCPrf_e64H4bai4RZ4tGpAgrtcVovyQuGczHxtjs?ext=png"},
        {name: "Boryoku Dragonz #840", image_url: "https://arweave.net/aumASCyJ2jccLCv-yjXOJSH47HeUrbqxlI1cZcW96EQ?ext=png"}
    ],"botheredotters": [
        {name: "Bothered Otter #1686", image_url: "https://www.arweave.net/JxxAxyWrNUE8ZM0l9ZIynWHkzB5s7Kmvss0F7Gl3vjw?ext=png"},
        {name: "Bothered Otter #168", image_url: "https://www.arweave.net/0V4ithUxYj0t992gfQvylC-E3di003KDIjz5Elx-cnA?ext=png"},
        {name: "Bothered Otter #1027", image_url: "https://www.arweave.net/E3_lYegrzBP-SrkPtlEtMT6ayaBNCeYJuxRlgrH3R0g?ext=png"},
        {name: "Bothered Otter #522", image_url: "https://www.arweave.net/CiEL4AuodE8DF6Awyxn7U56Ogy0nzqrAVZo8oXJk_fg?ext=png"}
    ],"rudegolems": [
        {name: "Golem #4444", image_url: "https://www.arweave.net/DTncGAO5BHAGB-FX6L6eMidmuC3d99aHJOzoDM7K8C4?ext=png"},
        {name: "Golem #1556", image_url: "https://www.arweave.net/5IixQl5ob57GSX_1uhvr9xQsYugP2jsUdyXVzzuQOKI?ext=png"},
        {name: "Golem #4306", image_url: "https://www.arweave.net/we0_VuHlmPREuDyZx7Q8oRy2oR5Pj_OP1n3TUd3BFoY?ext=png"},
        {name: "Golem #5012", image_url: "https://www.arweave.net/jTXoiPCiGTabwz_tfVZuLHNSPq-adh_RWWNy01uEn3c?ext=png"}
    ],"aiirrelevant": [
        {name: "Irrelevant #1142", image_url: "https://www.arweave.net/5dtvZ2ClWZ2CmEvrSso50CIkrMmPkiPYRRBsb7z2D-I?ext=png"},
        {name: "Irrelevant #1645", image_url: "https://www.arweave.net/9n2Fv0zOxk5GBl-H9djwC2m_CFkq2280oeXGjWq-njE?ext=png"},
        {name: "Irrelevant #1588", image_url: "https://www.arweave.net/-uDP5xZsGFc2EWEWWyNYV9SP8jFIWAJlEo_6c2ppS-E?ext=png"},
        {name: "Irrelevant #649", image_url: "https://www.arweave.net/lQ2cI9Xd7pCe2W1VPrMHAsShVBjmLRqSftaRtrvpYcE?ext=png"}
    ],"dronies": [
        {name: "Dronie #2067", image_url: "https://www.arweave.net/1cGV__4KHMDuKSkjOljK4D5nV5N_1mBj2d0HMGIhF08?ext=png"},
        {name: "Dronie #5874", image_url: "https://www.arweave.net/2UiAC2v0Tf_XJf_CgUkPt1FSdKZfc3PJ3OwX7jUcMRA?ext=png"},
        {name: "Dronie #7345", image_url: "https://www.arweave.net/mtBSQ0lUr_O2NbVy6rv_Hp0spOhbYxp8uCCYi1h85o8?ext=png"},
        {name: "Dronie #2725", image_url: "https://www.arweave.net/Et-vmpiP-22zDS4fFqwKl35rHk4eCeqqvo8Kzh7wlVY?ext=png"}
    ],"bestbuds": [
        {name: "Best Buds #3459", image_url: "https://bafybeihh644hwhmsunuolb7qkbzmbmcgiyf67o75rjmpvvnsvcdyr3lgde.ipfs.dweb.link/3459.png?ext=png"},
        {name: "Best Buds #3144", image_url: "https://bafybeicfyuuqjgnfdguz2i424fkominu5tqsktzlcf2wbvl6rizzuus2gi.ipfs.dweb.link/3144.png?ext=png"},
        {name: "Best Buds #1670", image_url: "https://bafybeieczixan2qrbgbc565xret2p3dd6ww47xnhbfevxsz3srcwe7rati.ipfs.dweb.link/1670.png?ext=png"},
        {name: "Best Buds #2224", image_url: "https://bafybeihl6wy2xp2oopvjscxr3xjpryxm7nq5yhok46rnm4a7n7kbq4cs2m.ipfs.dweb.link/2224.png?ext=png"}
    ],"soldoogles": [
        {name: "DOOGLES #364", image_url: "https://arweave.net/MSypJuDSGTLM5n4Vhuo-5dR6UOUfywWjIS_e0nURBmw"},
        {name: "DOOGLES #59", image_url: "https://arweave.net/IY5-E5dexQkrDzUZ4Wt9S4liT0_lKnrGA0hazQ0quVs"},
        {name: "DOOGLES #539", image_url: "https://arweave.net/Zpbp3qdINeiMYD0TvQctBe5nOM38BkfrAKDClHhOc6I"},
        {name: "DOOGLES #893", image_url: "https://arweave.net/s7eCos2wXDrGU-7Yej9zjmSVprRq4C-NZPObQE4gkBc"}
    ],"catalinawhilemixer": [
        {name: "Catalina Whale 3652", image_url: "https://www.arweave.net/2GGRyhiY3pFOHLUru5iR5o7I0Qm183PUExGTkR7zwuE?ext=png"},
        {name: "Catalina Whale 2560", image_url: "https://www.arweave.net/1H-SBAbxW-76R0fuhT6kvkbxtqYH1ywWpvxte2Av5Is?ext=png"},
        {name: "Catalina Whale 5403", image_url: "https://www.arweave.net/hlsgVFnFbVBJDqi8goBxf21PNFlOsvRHSKtT4NT0xxQ?ext=png"},
        {name: "Catalina Whale 2528", image_url: "https://www.arweave.net/7upWAmbY4bnYScR2IIfM7nUjWQfd6RslKNm5KOCfHOs?ext=png"}
    ],"folktalesoflunaria": [
        {name: "Lunarian #9244", image_url: "https://www.arweave.net/LhqVh8kcPb7CarD6yWRuxEUurvZBRBU7ca93agkKiog?ext=png"},
        {name: "Lunarian #9235", image_url: "https://www.arweave.net/4ZrkVrLCQOq_NVomh22PGEDG72gkVCq4dNdwba_gIi4?ext=png"},
        {name: "Lunarian #3773", image_url: "https://www.arweave.net/KEWhBKRf6LzgJYTUs9VB3GFloMt_sCTCU1H0ephZdW4?ext=png"},
        {name: "Lunarian #3060", image_url: "https://www.arweave.net/Zc39BO7XXnGVA0p7ZkpLKG6QrHn3mKqFF4AJ_dzrQFE?ext=png"}
    ],"mechsofsolana": [
        {name: "Mech #197", image_url: "https://www.arweave.net/OJYZToklsO_G76EmXPbEYXYnYjdj8CkkSGbPtW3f0TA?ext=png"},
        {name: "Mech #7880", image_url: "https://www.arweave.net/R7TkVfqmQSyEfgdjMv8nTfF1RQk4gu1Ip1MEi5-evUE?ext=png"},
        {name: "Mech #4681", image_url: "https://www.arweave.net/Vg-G-MzbgFvsVZdHIuP7MIaEVrH8Nk1e11qoZdQHaKQ?ext=png"},
        {name: "Mech #7867", image_url: "https://www.arweave.net/aYHK70xeQkPmIHcdTYZg09wSvi0z-tzU1a3deiGsseY?ext=png"}
    ],"balloonsville2": [
        {name: "Balloon #1871", image_url: "https://bafybeidzovxl74p2azj4cxpqvyysg47lcc23n5rkygu3hwv2e4ui2gzasi.ipfs.dweb.link/1871.png?ext=png"},
        {name: "Balloon #406", image_url: "https://bafybeie4dxfvxigrqyxoxvgbzdn54benuqsc2fdrkmab2qvwedjw7bqa7m.ipfs.dweb.link/406.png?ext=png"},
        {name: "Balloon #2150", image_url: "https://bafybeibcgoa3z6lnpfizbqgtsw3x7ebon42mltni6rjdgcxlmcfkdztvdi.ipfs.dweb.link/2150.png?ext=png"},
        {name: "Balloon #1137", image_url: "https://bafybeiegcok27aj33fqoyakqreupf7l4wwaqvkjjfyznkl4n7w6bgn4jve.ipfs.dweb.link/1137.png?ext=png"}
    ],"jellybabies": [
        {name: "JellyBabies #575", image_url: "https://www.arweave.net/x2WjY3WOKksrAH4IjodoI1CtuBS02cG4EJ-99DcP23Q?ext=png"},
        {name: "JellyBabies #1898", image_url: "https://www.arweave.net/JRMshUBF62tw9pBeKbC762TVo9TSHVIurZybOVgCKjI?ext=png"},
        {name: "JellyBabies #1971", image_url: "https://www.arweave.net/NPk3Ox4xnqEfYoaTQvIfdjlkcvweR8HhrOmE-XhJpT8?ext=png"},
        {name: "JellyBabies #1113", image_url: "https://www.arweave.net/vcHPOUuZtSknDu2EQTWBWJIGM0aHO_8mGG0b0Pnhs2s?ext=png"}
    ],"alpacaland": [
        {name: "Alpaca Land #2614", image_url: "https://www.arweave.net/GQU-ftp-WOTyHajrBFw8Y5Xk_3eoWo1_-dIe8XFyNbA?ext=png"},
        {name: "Alpaca Land #4801", image_url: "https://www.arweave.net/9OFH9lvXGLPmzjt7xRMBm73muVjpKzi2KLYNY9Pvj_o?ext=png"},
        {name: "Alpaca Land #771", image_url: "https://www.arweave.net/Zz8eF5zKFBOKlSVaL0HPkmH76tyVJ-xJOAzSmYwlRd4?ext=png"},
        {name: "Alpaca Land #2240", image_url: "https://www.arweave.net/QJKuNmAT6TOnzWNXYjSDYrdsrRgW8nTsdZM8s5S40x0?ext=png"}
    ],"gnaughtygnomes": [
        {name: "gNaughty gNomes #17", image_url: "https://www.arweave.net/XKt3lQUPYKUrJTT9wuEHXogJi_gFO4_io1rDnmrgDss?ext=png"},
        {name: "gNaughty gNomes #95", image_url: "https://www.arweave.net/wrsHV56hq1wSxlycQeitbTMnV_mxt8yXZPwL3y5bXpk?ext=png"},
        {name: "gNaughty gNomes #81", image_url: "https://www.arweave.net/PJF9Uyjcr07NbS7MiGyDFV7nyxP4bDK0nLMHskHvTTM?ext=png"},
        {name: "gNaughty gNomes #108", image_url: "https://www.arweave.net/ialSn1Lh42kZv0mymHU8YJW_aqZ5IfPXn1i35wzIq60?ext=png"}
    ],"pinclub": [
        {name: "Pin Club S1 #339", image_url: "https://www.arweave.net/B2OqbcVUo6cTq6xDeTyfdRlP_dQsWYCKTdNlNU_lHVk?ext=png"},
        {name: "Pin Club S1 #1011", image_url: "https://www.arweave.net/JMmClCzzMsGrmQwFNwRheEywIaa0ESFjkKmgkhNUx5I?ext=png"},
        {name: "Pin Club S1 #947", image_url: "https://www.arweave.net/InCxp3UBDkExGa0lNvmmn_KuP08kr-NUAAif2Q84bJs?ext=png"},
        {name: "Pin Club S1 #269", image_url: "https://www.arweave.net/53JSZ0Uh_XXzZJJId_XXM8TDMOTfx2v_8FCzhpnlpj0?ext=png"}
    ],"lifinityflares": [
        {name: "LIFINITY Flares #1638", image_url: "https://www.arweave.net/ZE1oZ38EHoRh3ZIzMqbUzIV6lpwjMD6RVP3ad31DGJg?ext=webp"},
        {name: "LIFINITY Flares #3656", image_url: "https://www.arweave.net/QJ8E8uDQc5J2MiT-ScIXB6zJ2tuvvnSn2ozm_YlT37w?ext=webp"},
        {name: "LIFINITY Flares #4252", image_url: "https://www.arweave.net/eLZrofVhSorarn0lUPg66QzI2OB0A6xKCdRlDFVSxZY?ext=webp"},
        {name: "LIFINITY Flares #5251", image_url: "https://www.arweave.net/ZDuNDpyvHhzfiqAqvQm7iM10yTZyavyqPmY8UXpVXBE?ext=webp"}
    ],"battlefornippon": [
        {name: "Battle For Nippon V2 #4335", image_url: "https://www.arweave.net/mL0TzyAEXfyDT50SZBIfw3pMvVZzi8ydUc2NsrBuU1Q?ext=png"},
        {name: "Battle For Nippon V2 #31", image_url: "https://www.arweave.net/oClU0kywbgh_7RE2DON4OFLOoIL0ZjvBRVcRrtrWfXc?ext=png"},
        {name: "Battle For Nippon V2 #5174", image_url: "https://www.arweave.net/CEckCJg0SU4jyfvjtMSLdJVrjCEAMKwo83kLtcfhcpE?ext=png"},
        {name: "Battle For Nippon V2 #3654", image_url: "https://www.arweave.net/Rcf1bQwIAz8CaRviL2CYDwQUewtQHqcLLvX-JsTYEM8?ext=png"}
    ],"retrowolf": [
        {name: "Retro Wolf #432", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/retrowolves/assets/7e9fdd00bea606736cf7d71dd5a14562.png"},
        {name: "Retro Wolf #326", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/retrowolves/assets/ea12a86c8be3586a307e6b4682eae105.png"},
        {name: "Retro Wolf #570", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/retrowolves/assets/9407e38738720968fc287cc44d59c857.png"},
        {name: "Retro Wolf #3", image_url: "https://monkelabs.nyc3.digitaloceanspaces.com/retrowolves/assets/38e550b4bcdf9057f6ef740b5710c13e.png"}
    ],"rudedemons": [
        {name: "Demon #1361", image_url: "https://arweave.net/PxvRAmUcqAnLYbTPIGWEqYQw4ygnlCmOnu1JWbUIFjM"},
        {name: "Demon #1537", image_url: "https://arweave.net/X4SvVdyy9B6njDr0_AvgmXX3n93wNrBNEBDVwCgsQCQ"},
        {name: "Demon #2083", image_url: "https://arweave.net/-J_zr6PVuKxyIZaRUgT4zFDMsSZcBCmA20brEL9gSgs"},
        {name: "Demon #1107", image_url: "https://arweave.net/Y5Dm1A1C1pZylNFdCot57qQ5-j2EHZvj72VOFz6a4d4"}
    ],"fancyfenchnft": [
        {name: "Galactic Gecko #1", image_url: "https://www.arweave.net/Ior6LZNV1rbtrqV3nxETbNQYjQgwxwZ3XeztJxd7aQ0?ext=jpeg"},
        {name: "Galactic Gecko #2", image_url: "https://www.arweave.net/GBVR-OgsO4vtf8CYZBgK5PV8ee_uyDtKi-Va1P0VNBo?ext=jpeg"},
        {name: "Galactic Gecko #3", image_url: "https://www.arweave.net/jezCEyTABQlhpc2P6gsoLhhVo-UuxhcdgvZe5mZe6V8?ext=jpeg"},
        {name: "Galactic Gecko #4", image_url: "https://www.arweave.net/_qfDJDPRtyhbv2_iXTDsnhWo31UFLLMtBAsmCoCtWx4?ext=jpeg"}
    ],"cybervillainz": [
        {name: "CyberVillainz #492", image_url: "https://www.arweave.net/ZWEPShUaX7OGRFSwVO58FtoZLsryNfhwsXzxb4E7Ha4?ext=png"},
        {name: "CyberVillainz #93", image_url: "https://www.arweave.net/QkAialZe6eId80ycwdGADDMWtAAknnrVY-5dEGXlVIM?ext=png"},
        {name: "CyberVillainz #887", image_url: "https://www.arweave.net/IeREfMiwpNUkGFjqhnbF-Y0QahHTRgehlT3D8EI89vE?ext=png"},
        {name: "CyberVillainz #818", image_url: "https://www.arweave.net/YJ3waSayrHw0oxO6lAW3PGw6lA1GxwL6PJq2I4jWzFw?ext=png"}
    ],

};

export {sampleMap};