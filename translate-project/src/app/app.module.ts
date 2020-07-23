import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateComponent } from './components/translate/translate.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserInputComponent } from './components/user-input/user-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    AgGridModule.withComponents([]),
    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
