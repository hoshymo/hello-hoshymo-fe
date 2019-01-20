import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseOptionsToken } from '@angular/fire';

import { AppComponent } from './app.component';
import { AccountComponent } from './pages/account.component';
import { AboutComponent } from './pages/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatInputModule,
    AngularFireModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, AngularFirestoreModule
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
