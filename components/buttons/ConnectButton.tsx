import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {useCallback, useState} from 'react';
import {Button} from 'react-native';
import {ProtocolOptions, SocialProtocol} from '@spling/social-protocol';

import useAuthorization from '../../utils/useAuthorization';
import {Transaction} from '@solana/web3.js';
import useSocialProtocolStore from '../../stores/useSocialProtocolStore';

export default function ConnectButton() {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const setSocialProtocol = useSocialProtocolStore(
    state => state.setSocialProtocol,
  );
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        const refreshed = await authorizeSession(wallet);
        console.log('Auth:', refreshed);
        const account = refreshed || selectedAccount;
        const nodeWallet = {
          signTransaction: async (tx: Transaction) => {
            const transactions = await wallet.signTransactions({
              transactions: [tx],
            });
            // Mutation expected
            return Object.assign(tx, transactions[0]);
          },
          signAllTransactions(txs: Transaction[]) {
            return wallet.signTransactions({
              transactions: txs,
            });
          },
          async signMessage(message: Uint8Array) {
            return (
              await wallet.signMessages({
                addresses: [account.address],
                payloads: [message],
              })
            )[0];
          },
          publicKey: account.publicKey,
          payer: undefined as any,
        };
        const options = {
          rpcUrl: 'https://api.mainnet-beta.solana.com/',
          useIndexer: true,
        } as ProtocolOptions;

        // Initialize the social prot ocol
        const socialProtocol = await new SocialProtocol(
          nodeWallet,
          null,
          options,
        ).init();
        setSocialProtocol(socialProtocol);
        console.log('SocialProtocl:', socialProtocol);
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [
    authorizationInProgress,
    authorizeSession,
    setSocialProtocol,
    selectedAccount,
  ]);
  return (
    <Button
      title="Connect Wallet"
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
    />
  );
}
