import f5stego from 'f5stegojs'
import { HDNodeWallet, Wallet } from 'ethers'

/**
 * Steganography key
 */
export const STEG_KEY = [
  66, 105, 108, 108, 105, 111, 110, 32, 117, 115, 101, 114, 115, 32, 116, 111, 32, 69, 116, 104, 101, 114, 101, 117,
  109,
]

/**
 * Embeds secretData into imageData
 *
 * @param imageData image data
 * @param secretData secret data
 */
export const embed = (imageData: Uint8Array, secretData: Uint8Array): Uint8Array => {
  if (!imageData || !secretData) {
    throw new Error('Invalid arguments')
  }

  if (imageData.length === 0) {
    throw new Error('Image data is empty')
  }

  if (secretData.length === 0) {
    throw new Error('Secret data is empty')
  }

  const stegger = new f5stego(STEG_KEY)

  return stegger.embed(imageData, secretData)
}

/**
 * Extracts secretData from imageData
 *
 * @param imageData image data
 */
export const extract = (imageData: Uint8Array): Uint8Array => {
  const stegger = new f5stego(STEG_KEY)

  return stegger.extract(imageData)
}

/**
 * Embeds encrypted wallet into image
 *
 * @param imageData image data
 * @param wallet wallet
 * @param password password for wallet encryption
 */
export const embedWallet = async (
  imageData: Uint8Array,
  wallet: Wallet | HDNodeWallet,
  password: string,
): Promise<Uint8Array> => {
  if (!imageData || !wallet) {
    throw new Error('Invalid arguments')
  }

  if (!password) {
    // the password can not be empty as it is not secure
    throw new Error('Password is empty')
  }

  const encryptedWallet = await wallet.encrypt(password)

  return embed(imageData, new TextEncoder().encode(encryptedWallet))
}

/**
 * Extracts encrypted wallet from image
 *
 * @param data image data
 * @param password password for wallet decryption
 */
export const extractWallet = async (data: Uint8Array, password: string): Promise<Wallet | HDNodeWallet> => {
  const encryptedWallet = new TextDecoder().decode(extract(data))

  return Wallet.fromEncryptedJson(encryptedWallet, password)
}
