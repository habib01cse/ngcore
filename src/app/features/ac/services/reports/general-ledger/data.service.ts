import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'common';

  constructor(private apiService: BaseDataService) { }
}
