import {Keypair} from '@solana/web3.js';

export const getAuthority = () => {
  const secret = JSON.parse('[1,2,3,4,5,6,7,8,9]') as number[];
  const secretKey = Uint8Array.from(secret);
  const authority = Keypair.fromSecretKey(secretKey);

  console.log('Authority: ', authority.publicKey);

  return authority;
};
