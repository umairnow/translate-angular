import {Injectable} from '@angular/core';
import {TranslateModel, TranslateSource} from '../Interfaces/translate-modal';
import { ApiService } from './api.service';
import {Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private data: TranslateModel[];
  private selectedItem: TranslateModel;
  private translationSource = new Subject<TranslateSource>();
  translationObserver$ = this.translationSource.asObservable();
  constructor(private apiService: ApiService) {}

  set selectedRow(value: TranslateModel) {
    this.selectedItem = value;
  }

  getTranslationData(): void {
    this.apiService.getTranslations().subscribe(t => {
      this.data = t;
      this.translationSource.next({list: this.data, add: null, delete: null, update: null});
    });
  }

  saveChanges(): void {
    const excluded = this.data.filter(v => v.key !== 'PLACE_HOLDER');
    this.apiService.updateTranslation(excluded).subscribe(response => {
      this.data = excluded;
      this.translationSource.next({add: null, delete: null, list: this.data, update: null});
    });
  }

  addNewTranslation(translation: TranslateModel): void {
    const index = this.data.findIndex(v => v.key === translation.key);
    if (index === -1) {
      this.data.push(translation);
      this.translationSource.next({add: translation, delete: null, list: null, update: null});
    } else {
      this.data[index] = translation;
      this.translationSource.next({add: null, delete: null, list: null, update: translation});
    }
  }

  deleteSelectedTranslation(): void {
    if (this.selectedItem == null) { return; }
    const index = this.data.findIndex(v => v.key === this.selectedItem.key);
    const deletedItem = this.data.find(v => v.key === this.selectedItem.key);
    if (index !== -1) {
      this.apiService.deleteTranslation(this.selectedItem.key).subscribe(response => {
        this.data.splice(index, 1);
        this.translationSource.next({list: null, delete: deletedItem, add: null, update: null});
        this.selectedItem = null;
      });
    }
  }
}
