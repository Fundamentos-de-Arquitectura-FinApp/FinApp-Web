import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FirebaseStorage} from '../environments/firebase-storage';
import {initializeApp} from '@angular/fire/app';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStorage(
      () => getStorage()),
    provideFirebaseApp(() =>
      initializeApp(FirebaseStorage)),
    provideFirestore(() => getFirestore()
    ),
    { provide: FIREBASE_OPTIONS, useValue: FirebaseStorage },
  ]
};
