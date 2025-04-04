import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './component/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule // Import AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }