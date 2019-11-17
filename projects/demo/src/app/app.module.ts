import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemToolbarModule } from '../../../better-item-toolbar/src/lib/item-toolbar.module';
import { A11yModule } from '@angular/cdk/a11y';
import { DemoListComponent } from './demo-list/demo-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent
  ],
  imports: [
    BrowserModule,
    ItemToolbarModule,
    A11yModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
