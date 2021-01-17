export class Config {
  static rserver: string = 'https://decapodapi.we-digital.ch';
  static lserver: string = 'https://localhost:5001';

  static getBaseUrl() {
    return this.lserver;
  }
}
