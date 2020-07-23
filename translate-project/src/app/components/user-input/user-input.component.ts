import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from '../translate/translate.component';
import { TranslateModel } from '../../Interfaces/translate-modal';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {

  constructor(private dataService: DataService) { }

  addNewRow() {
    this.dataService.addNewTranslation({key: 'PLACE_HOLDER',
      english: 'placeholder',
      danish: 'placeholder',
      swedish: 'placeholder',
      norwegian: 'placeholder'});
  }

  deleteRow() {
    this.dataService.deleteSelectedTranslation();
  }

  saveChanges() {
    this.dataService.saveChanges();
  }
}
