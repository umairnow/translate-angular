import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  columnDefs = [
    {headerName: 'Key', field: 'key', sortable: true, filter: true},
    {headerName: 'English', field: 'english', sortable: true, filter: true, editable: true},
    {headerName: 'Norwegian', field: 'norwegian', sortable: true, filter: true, editable: true},
    {headerName: 'Swedish', field: 'swedish', sortable: true, filter: true, editable: true},
    {headerName: 'Danish', field: 'danish', sortable: true, filter: true, editable: true}
  ];

  rowData = [];

  ngOnInit() {
    console.log('OnInit');
    this.dataService.getTranslationData().subscribe(translations => {
      console.log(translations);
      this.rowData = translations;
    });
  }

}
