import { IAsset } from './../../Instruments/interfaces/IAsset';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { InstrumentsService } from 'src/app/Instruments/instruments.service';

import { SelectItem } from 'primeng/api'
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  allAssets: IAsset[] = [];
  selectedAsset: IAsset;




  constructor(public instService: InstrumentsService) {
this.initAllInstruments();
  }



  ngOnInit(): void {

  }



  public doSomething() {
    console.log("do something");
this.initAllInstruments();
  }


  onRowSelect(event) {
  console.log("row selected");
  }





  public initAllInstruments(): void {


    console.log("initall instruments");
    this.instService.getAllAssets().subscribe((assets: IAsset[]) => {
      assets.forEach(a => {




        if (this.allAssets.find(y => y.assetKey == a.assetKey) ) {

        }
        else {

          console.log("add asset");
          console.log(a.assetName);
          this.allAssets.push( a);
        }
      });
    });
  }
}

