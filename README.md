# Meme Ethereum Wallet

**WARNING: This library is not intended for use in production, and we are not responsible for potential wallet leaks.**

## Why This Library?

Meme Wallet is designed to store encrypted Ethereum wallets inside images using steganography. It provides a novel and fun way to secure wallets with user passwords. While it's not suitable for financial control (it's less secure compared to solutions like MetaMask), it serves unique purposes in various scenarios.

## What is Steganography?

Steganography is a technique used to hide information within other media without revealing the existence of the hidden data. Unlike encryption, which focuses on concealing the content, steganography hides the very existence of the information. This makes it a powerful tool for secretive communication.

In the Meme Wallet library, steganography is applied to embed a wallet within an image. The wallet data is carefully concealed within the pixels of the image, making it virtually undetectable to the naked eye.

## How to Install

Simply run the following command:

```bash
npm i @dappykit/meme-wallet
```

## How to Use

### Importing the Library

```javascript
import MemeWallet from '@dappykit/meme-wallet'
```

### Creating a Wallet Inside an Image

```javascript
import { Wallet } from 'ethers'
import { MemeWallet } from '@dappykit/meme-wallet'

const password = 'My Password'
const imageData = new Uint8Array([]) // Image data in form of Uint8Array
const wallet = Wallet.createRandom()
const imageWithWallet = MemeWallet.embedWallet(imageData, wallet, password);
```

### Retrieving a Wallet from an Image

```javascript
const wallet = MemeWallet.extractWallet(imageWithWallet, password);
```

## Disclaimer

This library is designed for fun and experimental use only. It's pretty secure when a secure user password is used, but it should not be used for finance control. Always consider using more secure methods for sensitive financial information.

## Contributing

Feel free to contribute to the project by submitting pull requests or reporting issues.
