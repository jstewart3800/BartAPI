import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationInfo } from '../interfaces/station-info';

@Injectable({
      providedIn: 'root'
})
export class StationDataService {
      private stationUrl = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=ZPR9-57Q2-93ST-DWE9&json=y'

      private stationSheet;

      private staticData;
      private realTimeData;

      public station;
      public staticStation: StationInfo;


      public stationStaticInfo: StationInfo[] = [];


      constructor(private http: HttpClient) {
            this.getStatic();
      }

      getStatic() { //change to just control side list
            this.stationSheet = this.http.get(this.stationUrl);
            this.stationSheet.subscribe(
                  x => {
                        console.log(x);
                        for (let sd of x.root.stations.station) {
                              let nextStation: StationInfo = {
                                    title: sd.name,
                                    url: '/folder/' + sd.abbr,
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

      getStaticMKII(abbr: string) {
            let staticSheet = 'http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + abbr + '&key=ZPR9-57Q2-93ST-DWE9&json=y'
            this.staticData = this.http.get(staticSheet);
            this.staticData.subscribe(
                  x => {
                        this.staticStation = {
                              title: x.root.stations.station.name,
                              url: '/folder/' + x.root.stations.station.abbr,
                              abbr: x.root.stations.station.abbr,
                              address: x.root.stations.station.address,
                              city: x.root.stations.station.city,
                              state: x.root.stations.station.state,
                              zip: x.root.stations.station.zipcode
                        }
                        console.log(this.staticStation);
                  }
            )
      }

      getRealTime(abbr: string) {
            let realTimeSheet = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr + '&key=ZPR9-57Q2-93ST-DWE9&json=y'
            this.realTimeData = this.http.get(realTimeSheet);
            this.realTimeData.subscribe(
                  x => {
                        console.log(x);
                        this.station = {
                              name: x.root.station[0].name,
                              destinations: []
                        }
                        for (let d of x.root.station[0].etd) {
                              const destination = {
                                    destName: d.destination,
                                    etd: [],
                                    platform: d.estimate[0].platform,
                                    line: d.estimate[0].color
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
