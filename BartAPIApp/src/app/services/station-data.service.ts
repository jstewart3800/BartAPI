import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationInfo } from '../interfaces/station-info';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private stationUrl = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=ZPR9-57Q2-93ST-DWE9&json=y'

  private stationSheet;

  stationLinks = [
    {
      title: 'BART Home',
      url: '/folder/BART Home'
    }
  ];

  constructor(private http: HttpClient) {
    this.getStationList();
  }

  getStationList() {
    this.stationSheet = this.http.get(this.stationUrl);
    this.stationSheet.subscribe(
      x => {
        console.log(x);
        for (let sd of x.root.stations.station) {
          let nextStation = {
            title: sd.name,
            url: '/folder/' + sd.name,
            abbr: sd.abbr
          }
          this.stationLinks.push(nextStation);
        }
        console.log(this.stationLinks)
      }
    );
  }

  getStationInfo() {
    // this.
  }
}
