// This is an example function for calling the SocialProtocol instance and creating a new user
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {Connection, PublicKey} from '@solana/web3.js';
import {
  FileUriData,
  SocialProtocol,
  Post,
  FileData,
} from '@spling/social-protocol';
import {mintPoeken} from './mintPoeken';
import {APP_IDENTITY, getPublicKeyFromAddress} from './useAuthorization';

export const createPost = async (
  socialProtocol: SocialProtocol,
  connection: Connection,
  title: string | null | undefined,
  text: string | null | undefined,
  files: FileData[] | FileUriData[],
  tag: string | null | undefined,
  metadata?: any,
) => {
  console.log('Creating new post...');

  // transact(async wallet => {
  //   const account = await wallet.authorize({
  //     cluster: 'mainnet-beta',
  //     identity: APP_IDENTITY,
  //   });

  // const post: Post = await socialProtocol.createPost(
  //   1,
  //   title,
  //   text,
  //   files,
  //   tag,
  //   metadata,
  // );
  // console.log('Created new post: ' + post);
  await mintPoeken(
    connection,
    new PublicKey('DXCRrz19BP644XakHM3QvRN74LNMof1dtQeKha2fUaMe'),
    // getPublicKeyFromAddress(account.accounts[0].address),
  );

  // return post;
  // });
};
