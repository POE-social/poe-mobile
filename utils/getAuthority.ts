import {Keypair} from '@solana/web3.js';

export const getAuthority = () => {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[];
  const secretKey = Uint8Array.from(secret);
  const authority = Keypair.fromSecretKey(secretKey);

  console.log('Authority: ', authority.publicKey);

  return authority;
};
