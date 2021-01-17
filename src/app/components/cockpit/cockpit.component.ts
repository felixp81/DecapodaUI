import { IAccountStatement } from './../../Instruments/interfaces/iaccount-statement';
import { ITrade } from './../../Instruments/interfaces/itrade';
import { element } from 'protractor';
import { IAssetTick } from './../../Instruments/interfaces/iasset-tick';
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


  allTrades: ITrade[] = [];
  selectedTrade: ITrade;

  allStatements: IAccountStatement[] = [];
  selectedStatement: IAccountStatement;




  data: any;


  constructor(public instService: InstrumentsService) {
    this.receiveAllAssets();
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    }



  }


  updateInstrument()
  {

  }

  selectData(event) {
  }

  onTradeRowSelect(event) {
  }


  updateTrades(ident: string,  data)
  {
    this.instService.getTrades(ident).subscribe(
      (trades: ITrade[])=>
      {
        this.allTrades = trades;


      //  data.datasets.length = 3;

        data.datasets.push(
          {
            label: "Buy",
            data: [],
            fill: false,
            borderColor: "red"
          },
          {
            label: "Sell",
            data: [],
            fill: false,
            borderColor: "red"
          });

          for (let i = 0; i<data.labels.length; i++)
          {
            data.datasets[3].data.push(null);
            data.datasets[4].data.push(null);
          };


         this.allTrades.forEach(element => {

          let label:string ="";

          data.labels.forEach(timeSt => {
              let  d: Date = timeSt;
              if (d <= element.timestamp)
                label = timeSt;
          });

          let index = data.labels.findIndex((exLabel) => exLabel == label);
          if (index >= 0) {
            if (element.action== "overweight" && element.status != "rejected")
              data.datasets[3].data[index] = element.price * 1.01;
            else if (element.action != "overweight" && element.status != "rejected")
              data.datasets[4].data[index] = element.price * 0.99;
          }
        });

this.data = data;


      },
      (error: Error) =>
      {
        this.allTrades.length = 0;
      }
    );

    this.instService.getAccountStatements().subscribe(
      (statements: IAccountStatement[])=>
      {
        this.allStatements = statements;
      },
      (error: Error) =>
      {
        this.allStatements.length = 0;
      }

    )
  }
  onRowSelect(event) {

    this.selectedAsset = event.data;

    this.instService.updateInstrument(this.selectedAsset.symbolIdent);
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'my Dataset',
          data: [],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: "Average 50",
          data: [],
          fill: true,
          borderColor: "red"
        },
        {
          label: "Average 200",
          data: [],
          fill: true,
          borderColor: "green"
        }

      ]
    };

    this.instService.getNavs(this.selectedAsset.symbolIdent).subscribe(
      (navs: IAssetTick[]) => {
        let data = { labels: [], datasets: [] };
        data.datasets.push({
          label: "my instr",
          data: [],
          fill: true,
          borderColor: '#4bc0c0'
        }
        );
        data.datasets.push({
          label: "Average 50",
          data: [],
          fill: false,
          borderColor: 'red'
        });

        data.datasets.push({
          label: "Average 200",
          data: [],
          fill: false,
          borderColor: 'green'
        });

        for (let count = 0; count < navs.length; count++) {
          if (count % 10 == 0) {
            data.labels.push(navs[count].timeStamp.toString());
            data.datasets[0].data.push(navs[count].price);
            data.datasets[1].data.push(navs[count].avglast50);
            data.datasets[2].data.push(navs[count].avglast200);
          }
        }

;
       this.updateTrades(this.selectedAsset.symbolIdent, data);


      });
  }


  receiveAllAssets(): void {
    this.instService.getAllAssets().subscribe(
      (assets: IAsset[]) => {

        this.allAssets = assets;
        console.log("received all assets");
      },
      (error: Error) => {
        console.log("error");
      }
    );
  }
  ngOnInit(): void {
    this.receiveAllAssets();

  }
}

