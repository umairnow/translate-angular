import {Injectable} from '@angular/core';
import { TranslateModel } from '../Interfaces/translate-modal';
import { ApiService } from './api.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private apiService: ApiService) {}

  getTranslationData(): Observable<TranslateModel[]> {
    return this.apiService.getTranslations();
  }

}
