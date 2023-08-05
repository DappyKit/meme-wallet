import path from 'path'
import * as fs from 'fs'
import { HDNodeWallet, Wallet } from 'ethers'
import { embed, embedWallet, extractWallet } from '../../src/lib/memeWallet'

describe('Stego', () => {
  let wallet: Wallet | HDNodeWallet
  let password: string
  let secretData: Uint8Array
  let imageData: Uint8Array
  const filePath = path.join(__dirname, '../data/stego/1.jpeg')
  const fileBuffer = fs.readFileSync(filePath)

  beforeEach(() => {
    wallet = Wallet.createRandom()
    password = 'test_password'
    secretData = new TextEncoder().encode('test_secret_data')
    imageData = new Uint8Array([1, 2, 3])
  })

  it('embed and extract wallet', async () => {
    const wallet = Wallet.createRandom()
    const password = 'hello world'
    const resultImage = await embedWallet(fileBuffer, wallet, password)
    const extractedWallet = await extractWallet(resultImage, password)
    expect(extractedWallet.address).toStrictEqual(wallet.address)
    expect(extractedWallet.privateKey).toStrictEqual(wallet.privateKey)
  })

  it('should handle empty imageData when embedding', () => {
    expect(() => embed(new Uint8Array(), secretData)).toThrowError('Image data is empty')
  })

  it('should handle empty secretData when embedding', () => {
    expect(() => embed(imageData, new Uint8Array())).toThrowError('Secret data is empty')
  })

  it('should handle empty password when embedding wallet', async () => {
    await expect(embedWallet(imageData, wallet, '')).rejects.toThrowError('Password is empty')
  })

  it('should handle empty wallet when embedding', async () => {
    await expect(embedWallet(imageData, {} as Wallet, password)).rejects.toThrowError(
      'wallet.encrypt is not a function',
    )
  })

  it('should handle imageData is not jpg', () => {
    const largeImageData = new Uint8Array(1e6)
    expect(() => embed(largeImageData, secretData)).toThrowError('bad jpeg ')
  })

  it('should handle long password when embedding wallet', async () => {
    const longPassword = 'a'.repeat(1e6)
    await expect(embedWallet(fileBuffer, wallet, longPassword)).resolves.toBeDefined()
  })

  it('should handle special characters in password when embedding wallet', async () => {
    const specialPassword = '!@#$%^&*()'
    await expect(embedWallet(fileBuffer, wallet, specialPassword)).resolves.toBeDefined()
  })
})
