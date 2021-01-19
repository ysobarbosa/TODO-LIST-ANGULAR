import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoService } from './shared/to-do.service';

@NgModule({
  declarations: [AppComponent, ToDoListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'to-do-list'),
    AngularFirestoreModule,
  ],

  providers: [ToDoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
