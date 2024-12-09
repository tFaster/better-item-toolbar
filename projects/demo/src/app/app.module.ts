import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemToolbarModule } from '@tfaster/better-item-toolbar';
import { A11yModule } from '@angular/cdk/a11y';
import { DemoListComponent } from './demo-list/demo-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ItemToolbarModule,
    A11yModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
