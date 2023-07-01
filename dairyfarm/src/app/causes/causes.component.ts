import { Component } from '@angular/core';
export interface TableData {
  Sno: number;
  disease: string;
  cause: number;
}
@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent {
  tableData: TableData[] = [
    { Sno: 1, disease: 'John Doe', cause: 25 },
    { Sno: 2, disease: 'Jane Smith', cause: 30 },
    { Sno: 2, disease: 'Jane Smith', cause: 30 }, { Sno: 2, disease: 'Jane Smith', cause: 30 },
    { Sno: 3, disease: 'Bob Johnson', cause: 35 }
  ];

  displayedColumns: string[] = ['Sno', 'disease', 'cause'];

}
