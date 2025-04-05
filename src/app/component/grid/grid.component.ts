import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';  
import { Module } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public modules: Module[] = [ClientSideRowModelModule];
  rowData: any[] = [];
  originalRowData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Age', field: 'age', sortable: true, filter: true },
    { headerName: 'Phone Number', field: 'phone', sortable: true, filter: true },
    { headerName: 'Stocks Allocated (Units)', field: 'stocks', sortable: true, filter: true },
    { headerName: 'Skill Proficiency', field: 'skill', cellRenderer: this.skillRenderer }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.rowData = data;
      this.originalRowData = [...data]; 
    });
  }

  skillRenderer(params: any) {
    const value = params.value;
    return `
      <div style="display: flex; align-items: center;">
        <div style="width: 100px; height: 10px; background-color: #e0e0e0; margin-right: 5px;">
          <div style="width: ${value}%; height: 100%; background-color: #4caf50;"></div>
        </div>
        <span>${value}%</span>
      </div>
    `;
  }

  onQuickFilterChanged(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue) {
      this.rowData = this.originalRowData.filter((row) => row.name.toLowerCase().includes(filterValue));
    } else {
      this.rowData = [...this.originalRowData];
    }
  }
}
