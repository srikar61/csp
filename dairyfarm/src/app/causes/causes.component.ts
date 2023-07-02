// import { Component } from '@angular/core';
// export interface TableData {
//   sno: number;
//   disease: string;
//   cause: number;
// }
// @Component({
//   selector: 'app-causes',
//   templateUrl: './causes.component.html',
//   styleUrls: ['./causes.component.css']
// })
// export class CausesComponent {
//   tableData: TableData[] = [
//     { sno: 1, disease: 'John Doe', cause: 25 },
//     { sno: 2, disease: 'Jane Smith', cause: 30 },
//     { sno: 2, disease: 'Jane Smith', cause: 30 }, { sno: 2, disease: 'Jane Smith', cause: 30 },
//     { sno: 3, disease: 'Bob Johnson', cause: 35 }
//   ];

//   displayedColumns: string[] = ['sno', 'disease', 'cause'];

// }

import { Component, OnInit } from '@angular/core';
import { CausesService } from '../causes.service';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css'],
})
export class CausesComponent implements OnInit {
  tableData: any[] = [];
  displayedColumns: string[] = ['sno', 'disease', 'cause'];

  constructor(private causesService: CausesService) {}

  ngOnInit(): void {
    this.getCausesData();
  }

  getCausesData(): void {
    this.causesService.getCausesData().subscribe(
      (data) => {
        this.tableData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
