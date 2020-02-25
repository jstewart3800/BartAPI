import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationDataService } from '../services/station-data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private folderStaticInfo = this.SDService.stationStaticInfo;
  public folderRealTimeInfo = this.SDService.station;

  constructor(private activatedRoute: ActivatedRoute, public SDService: StationDataService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.folder);
  }

  

}
