import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationInfo } from '../interfaces/station-info';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private stationUrl = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=ZPR9-57Q2-93ST-DWE9&json=y'

  private stationSheet;

  private allStations: StationInfo[] = [];

  constructor(private http: HttpClient) {
    this.getStation();
  }

  getStation() {
    this.stationSheet = this.http.get(this.stationUrl);
    this.stationSheet.subscribe(
      x => {
        console.log(x);
        for (let sd of x.root.stations.station) {
          let nextStation: StationInfo = {
            name: sd.name,
            abbr: sd.abbr,
            address: sd.address,
            city: sd.city,
            state: sd.state,
            zip: sd.zipcode
          }
          this.allStations.push(nextStation);
        }
        console.log(this.allStations)
      }
    );
  }
}
