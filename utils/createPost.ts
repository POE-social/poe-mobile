// This is an example function for calling the SocialProtocol instance and creating a new user
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {
  FileUriData,
  SocialProtocol,
  Post,
  FileData,
} from '@spling/social-protocol';
import {APP_IDENTITY} from './useAuthorization';

export const createPost = async (
  socialProtocol: SocialProtocol,
  title: string | null | undefined,
  text: string | null | undefined,
  files: FileData[] | FileUriData[] | null | undefined,
  tag: string | null | undefined,
  metadata?: any,
) => {
  console.log('Creating new post...');
  transact(async wallet => {
    wallet.authorize({cluster: 'mainnet-beta', identity: APP_IDENTITY});
    const post: Post = await socialProtocol.createPost(
      1,
      title,
      text,
      files,
      tag,
      metadata,
    );
    console.log('Created new post: ' + post);
    return post;
  });
};
