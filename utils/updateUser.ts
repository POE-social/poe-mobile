// This is an example function for calling the SocialProtocol instance and creating a new user
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {FileUriData, SocialProtocol, User} from '@spling/social-protocol';
import {APP_IDENTITY} from './useAuthorization';

export const updateUser = async (
  socialProtocol: SocialProtocol,
  nickname: string,
  avatar: FileUriData | null,
  biography: string | null,
  metadata?: any,
) => {
  console.log('Updating new user...');
  transact(async wallet => {
    await wallet.authorize({cluster: 'mainnet-beta', identity: APP_IDENTITY});
    const user: User = await socialProtocol.updateUser(
      nickname,
      avatar,
      biography,
      metadata,
    );
    console.log('Updating new user: ' + user);
    return user;
  });
};
