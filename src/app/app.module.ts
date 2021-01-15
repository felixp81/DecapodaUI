import { InstrumentsService } from './Instruments/instruments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ListboxModule} from 'primeng/listbox';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentEditorComponent } from './instrument-editor/instrument-editor.component';
import { from } from 'rxjs';
import {PickListModule} from 'primeng/picklist';

import { CockpitComponent } from './components/cockpit/cockpit.component';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentEditorComponent,
    CockpitComponent
  ],
  imports: [
    BrowserModule,
    ListboxModule,
    PickListModule,
    ChartModule,
    TableModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [InstrumentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
