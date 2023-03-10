import {Keypair} from '@solana/web3.js';

export const getAuthority = () => {
  const secret = JSON.parse(
    '[58,220,123,53,68,252,154,183,140,69,228,11,122,82,230,157,13,45,197,132,7,57,225,185,8,218,238,1,220,41,133,112,186,8,150,253,128,175,201,207,255,214,225,1,173,98,94,18,177,53,198,236,148,138,106,81,24,80,6,23,227,98,248,201]',
  ) as number[];
  const secretKey = Uint8Array.from(secret);
  const authority = Keypair.fromSecretKey(secretKey);

  console.log('Authority: ', authority.publicKey);

  return authority;
};
