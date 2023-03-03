// This is an example function for calling the SocialProtocol instance and creating a new user
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {FileUriData, SocialProtocol, User} from '@spling/social-protocol';
import {APP_IDENTITY} from './useAuthorization';

export const createUser = async (
  socialProtocol: SocialProtocol,
  nickname: string,
  avatar: FileUriData | null,
  biography: string | null,
  metadata?: any,
) => {
  console.log('Creating new user...');
  transact(async wallet => {
    wallet.authorize({cluster: 'mainnet-beta', identity: APP_IDENTITY});
    const user: User = await socialProtocol.createUser(
      nickname,
      avatar,
      biography,
      metadata,
    );
    console.log('Created new user: ' + user);
    return user;
  });
};
