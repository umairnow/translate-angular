import {Injectable} from '@angular/core';
import { TranslateModel } from '../Interfaces/translate-modal';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  translations: TranslateModel[];
  constructor(private apiService: ApiService) {
    this.getTranslationData();
  }

  getTranslationData(): void {
    this.apiService.getTranslations().subscribe(translations => {
      this.translations = translations;
    });
  }

}
