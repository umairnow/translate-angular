import {Component, Injectable, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {TranslateModel, TranslateSource} from '../../Interfaces/translate-modal';
import {GridApi} from 'ag-grid-community';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent {
  private gridApi: GridApi;
  public rowData: TranslateModel[] = [];
  public columnDefs = [
    {headerName: 'Key', field: 'key', filter: true, checkboxSelection: true, editable: true},
    {headerName: 'English', field: 'english', filter: true, editable: true},
    {headerName: 'Norwegian', field: 'norwegian', filter: true, editable: true},
    {headerName: 'Swedish', field: 'swedish', filter: true, editable: true},
    {headerName: 'Danish', field: 'danish', filter: true, editable: true}
  ];
  constructor(private dataService: DataService) {
    this.dataService.translationObserver$.subscribe(translateSource => {
      if (translateSource.list != null) {
        this.rowData = translateSource.list;
      }
      if (translateSource.add != null) {
        this.gridApi.applyTransaction({ add: [translateSource.add] });
      }
      if (translateSource.delete != null) {
        this.gridApi.applyTransaction({ remove: [translateSource.delete] });
      }
      if (translateSource.update != null) {
        this.gridApi.refreshCells({force: true, suppressFlash: true});
      }
    });
  }

  onSelectionChanged() {
    this.dataService.selectedRow = this.gridApi.getSelectedRows().length > 0 ? this.gridApi.getSelectedRows()[0] : null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.dataService.getTranslationData();
  }
}
