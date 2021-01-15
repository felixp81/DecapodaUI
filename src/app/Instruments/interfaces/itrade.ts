export interface ITrade {

  timestamp: Date;
  instrument: string;
  action: string;
  status: string;
  price: number;
}
