import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'Ber1g0';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key:any) {
      key = CryptoJS.SHA256(key);
      return key.toString();
    },
    encrypt: function encrypt(data:any) {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();

    },
    decrypt: function decrypt(data:any) {
      return CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
  });
}
