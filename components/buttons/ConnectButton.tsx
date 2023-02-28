import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {useCallback, useState} from 'react';
import {Button} from 'react-native';
import {ProtocolOptions, SocialProtocol} from '@spling/social-protocol';

import useAuthorization from '../../utils/useAuthorization';
import {Keypair} from '@solana/web3.js';

export default function ConnectButton() {
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        const auth = await authorizeSession(wallet);
        console.log('Auth:', auth);
        const options = {
          rpcUrl: 'https://api.mainnet-beta.solana.com/',
          useIndexer: true,
        } as ProtocolOptions;

        // Initialize the social protocol
        const socialProtocol = await new SocialProtocol(
          Keypair.generate(),
          null,
          options,
        ).init();
        console.log('SocialProtocl:', socialProtocol);
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);
  return (
    <Button
      title="Connect Wallet"
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
    />
  );
}
