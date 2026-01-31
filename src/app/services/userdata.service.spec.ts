import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
    ]
  }));

  it('should be created', () => {
    const service: UserdataService = TestBed.inject(UserdataService);
    expect(service).toBeTruthy();
  });
});
