import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { ArrComponent } from './arr/arr.component';

import { RouterModule, Routes } from '@angular/router';
import { WriteEntryComponent } from './write-entry/write-entry.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'write', component: WriteEntryComponent },
  { path: '',  component: EntriesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    WriteEntryComponent,
    PageNotFoundComponent,
    ArrComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
