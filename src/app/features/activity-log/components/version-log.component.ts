import { Component, OnInit } from '@angular/core';
import { BaseDataService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

const assetPath = `${environment.ASSET_HOST}assets/activity/version-log/`;
@Component({
  selector: 'app-version-log',
  templateUrl: './../templates/version-log.component.html',
  styleUrls: ['./../scss/version-log.component.scss']
})
export class VersionLogComponent implements OnInit {
  public activities = [];

  constructor(private baseDataSvc: BaseDataService) { }

  ngOnInit() {
    this.baseDataSvc.getFileData(assetPath+'history.json')
    .subscribe(res=> {
      console.log(res);
      if(res && res.length > 0) {
        this.activities = res.map(item=> {
          item.isLoading = false;
          item.isMax = false;
          item.isLoaded = false;
          item.display = false;
          item.timelines = [];
           return item;});
      }
      
    });
  }

  onClickLoad(item) {
    if(item.isMax === false) {
      if(item.isLoaded === false) {
        item.isLoading = true;
        this.baseDataSvc.getFileData(assetPath+item.fileName).subscribe(res=> {
          item.isLoading = false;
          if(res && res.length > 0) {
            item.timelines = res;
            item.isLoaded = true;
          }
          item.isMax = true;
          item.display = true;
        });

      } else {
        item.isMax = true;
        item.display = true;
      }

    } else item.isMax = false;

  }

  onAnimationEnd(event, item) {
    if(event.animationName ==="slideOutUp") {
      item.display = false;
    }
    else if(event.animationName ==="slideInDown") {
      item.display = true;
    }    
  }

}
