import { encrypt, decrypt } from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';

export const generateKeyPair = async (): Promise<{ pub: string; priv: string }> => {
  const key = crypto.randomBytes(32).toString('base64');
  return { pub: key, priv: key };
};

export const encryptMessage = (pubkey: string, message: string): { ciphertext: string; nonce: string } => {
  const nonce = crypto.randomBytes(12).toString('base64');
  const encrypted = encrypt(message, pubkey + nonce).toString();
  return { ciphertext: encrypted, nonce };
};

export const decryptMessage = (privkey: string, ciphertext: string, nonce: string): string => {
  return decrypt(ciphertext, privkey + nonce).toString(UTF8);
};
