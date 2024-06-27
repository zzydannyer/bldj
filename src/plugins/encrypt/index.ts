//RSA 加解密工具类
import JSEncrypt from 'jsencrypt';

const encryptor = new JSEncrypt();
const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzQR/JN7+qhbyFBj5pF8y20TuvwGOoibXtE2TW4LwjiaCpb8UGEkMeR6uAIEJ6EqtEv9PLXIDS2XdhjXGTLNwkTz4ZwJkbCa9zKRbEGtssNHQFtgJwj61wmYruCtoMRik+naLleuCanpmGnRh440DvHzQBtM5lGPiE43/kxAV32QIDAQAB';
encryptor.setPublicKey(PUBLIC_KEY);

// 加密
export const encrypt = (data: string): string => encryptor.encrypt(data) as string;
