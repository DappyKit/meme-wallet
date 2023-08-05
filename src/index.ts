import * as MemeWallet from './lib'

export { MemeWallet }

declare global {
  interface Window {
    memeWallet: {
      MemeWallet: typeof MemeWallet
    }
  }
}
