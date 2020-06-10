import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  constructor(private dataService: DataService) { 
  }

  columnDefs = [
    {headerName: 'Key', field: 'key', sortable: true, filter: true},
    {headerName: 'English', field: 'enText', sortable: true, filter: true, editable: true},
    {headerName: 'Norwegian', field: 'noText', sortable: true, filter: true, editable: true},
    {headerName: 'Swedish', field: 'svText', sortable: true, filter: true, editable: true}
  ];

  rowData = [];

  ngOnInit() {
    this.rowData = this.dataService.getTranslationData();
  }

}
