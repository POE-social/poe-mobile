import {SocialProtocol} from '@spling/social-protocol';
import {create} from 'zustand';

interface SocialProtocolState {
  socialProtocol: SocialProtocol | null;
  setSocialProtocol: (socialProtocol: SocialProtocol) => void;
}

const useSocialProtocolStore = create<SocialProtocolState>(set => ({
  socialProtocol: null,
  setSocialProtocol: socialProtocol => set({socialProtocol: socialProtocol}),
}));

export default useSocialProtocolStore;
