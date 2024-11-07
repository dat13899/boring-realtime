import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import crypto from 'crypto-js';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  SECRET_KEY = '5c17fe13-e7fc-437b-9fcd-3d9a0a00bcb0';
  platformId: Object;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,) {
    this.platformId = platformId;
  }
  // Set the json data to local storage
  setItem(key: string, value: any) {
    var encryptedData = crypto.AES.encrypt(JSON.stringify(value), this.SECRET_KEY).toString();
    if (isPlatformBrowser(this.platformId)) {
      this.removeItem(key);
      localStorage.setItem(key, encryptedData);
    }
  }
  // Get the json value from local storage
  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedData = localStorage.getItem(key);
      if (encryptedData) {
        try {
          const decrypted = crypto.AES.decrypt(encryptedData, this.SECRET_KEY).toString(crypto.enc.Utf8);
          if (decrypted) {
            return JSON.parse(decrypted);
          }
        } catch (error) {
          console.error("Decryption error:", error);
        }
      }
    }
    return null;
  }
  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(key);
  }
  clear() {
    if (isPlatformBrowser(this.platformId)) localStorage.clear();
  }
}
