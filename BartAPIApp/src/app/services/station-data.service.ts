import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationInfo } from '../interfaces/station-info';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private stationUrl = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=ZPR9-57Q2-93ST-DWE9&json=y'
  


  private stationSheet;
  private realTimeData;
  private station;


  stationStaticInfo: StationInfo[] = [
    {
      title: 'BART Home',
      url: '/folder/BART Home',
      abbr: '',
      address: '',
      city: '',
      state: '',
      zip: 0
    }
  ];

  constructor(private http: HttpClient) {
    this.getStatic();
  }

  getStatic() {
    this.stationSheet = this.http.get(this.stationUrl);
    this.stationSheet.subscribe(
      x => {
        console.log(x);
        for (let sd of x.root.stations.station) {
          let nextStation: StationInfo = {
            title: sd.name,
            url: '/folder/' + sd.name,
            abbr: sd.abbr,
            address: sd.address,
            city: sd.city,
            state: sd.state,
            zip: sd.zipcode
          }
          this.stationStaticInfo.push(nextStation);
        }
        console.log(this.stationStaticInfo)
      }
    );
  }

  getRealTime(abbr: string) {
    let realTimeSheet = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr + '&key=MW9S-E7SL-26DU-VV8V&json=y'
    this.realTimeData = this.http.get(realTimeSheet);
    this.realTimeData.subscribe(
      x => {
        console.log(x.root.station[0]);
        this.station = {
          name: x.root.station[0].name,
          destinations: [],
        }
        for (let d of x.root.station[0].etd) {
          const destination = {
            destName: d.destination,
            etd: []
          }
          for (let e of d.estimate) {
            destination.etd.push(e.minutes);
          }
          this.station.destinations.push(destination);
        }
        console.log(this.station);
      }
    );
  }
}
