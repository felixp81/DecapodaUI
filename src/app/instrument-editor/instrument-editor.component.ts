import { InstrumentsService } from './../Instruments/instruments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrument-editor',
  templateUrl: './instrument-editor.component.html',
  styleUrls: ['./instrument-editor.component.css']
})
export class InstrumentEditorComponent implements OnInit {

  InstrumentName: string;


  constructor(InstService:InstrumentsService) { }

  ngOnInit(): void {

  }

}
