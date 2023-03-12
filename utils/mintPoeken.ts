import {
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';
import {Connection, PublicKey} from '@solana/web3.js';
import {getAuthority} from './getAuthority';

export const mintPoeken = async (connection: Connection, user: PublicKey) => {
  const mintAddress = new PublicKey(
    '2tcfaJRqSh9doHqGC9qmmDXVc1GmyPDfG7nY4YpCZPqj',
  );
  console.log('Getting authority');
  const authority = getAuthority();
  const mintInfo = await getMint(connection, mintAddress);

  console.log('Get or create ATA');
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    mintAddress,
    user,
  );
  console.log('ATA: ', tokenAccount.address);

  console.log('Mint Poeken...');
  try {
    const tx = await mintTo(
      connection,
      authority,
      mintInfo.address,
      tokenAccount.address,
      authority,
      10 * 10 ** mintInfo.decimals,
    );
    console.log('Transaction: ', tx);
  } catch (e) {
    console.log(e);
  }
};
