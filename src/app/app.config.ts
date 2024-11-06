import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FirebaseApp, initializeApp, initializeServerApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { isPlatformBrowser } from '@angular/common';
export const firebaseConfig = {
  "projectId": "boring-realtime",
  "appId": "1:321409841040:web:96907f880f9d8e32686515",
  "databaseURL": "https://boring-realtime-default-rtdb.asia-southeast1.firebasedatabase.app",
  "storageBucket": "boring-realtime.firebasestorage.app",
  "apiKey": "AIzaSyBaOpQKmXlYtaHKDTWESV_JTHXjc0riVbw",
  "authDomain": "boring-realtime.firebaseapp.com",
  "messagingSenderId": "321409841040"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(
      firebaseConfig
    )),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(firebaseConfig);
      }
      // Optional, since it's null in dev-mode and SSG
      return initializeServerApp(firebaseConfig, {
        releaseOnDeref: undefined
      }
      );
    }),
    provideAuth(() => getAuth(inject(FirebaseApp))),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI())
  ]
};
