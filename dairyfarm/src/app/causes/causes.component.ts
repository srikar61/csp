// import { Component } from '@angular/core';
// export interface TableData {
//   Sno: number;
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
//     { Sno: 1, disease: 'John Doe', cause: 25 },
//     { Sno: 2, disease: 'Jane Smith', cause: 30 },
//     { Sno: 2, disease: 'Jane Smith', cause: 30 }, { Sno: 2, disease: 'Jane Smith', cause: 30 },
//     { Sno: 3, disease: 'Bob Johnson', cause: 35 }
//   ];

//   displayedColumns: string[] = ['Sno', 'disease', 'cause'];

// }
import { Component, OnInit } from '@angular/core';
import * as oracledb from 'oracledb';

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
export class CausesComponent implements OnInit {
  tableData: TableData[] = [];
  displayedColumns: string[] = ['Sno', 'disease', 'cause'];

  ngOnInit(): void {
    this.fetchDataFromOracle();
  }

  async fetchDataFromOracle(): Promise<void> {
    try {
      // Establish a connection to the Oracle database
      const connection = await oracledb.getConnection({
        user: 'system',
        password: 'admin',
        connectString: '//localhost:1521/XEs'
      });

      // Execute the query to fetch data from the "causes" table
      const result = await connection.execute('SELECT sno, disease, cause FROM causes');

      // Check if the result has rows before accessing them
      if (result.rows) {
        // Map the query result to the TableData interface
        this.tableData = result.rows.map((row: any) => ({
          Sno: row[0],
          disease: row[1],
          cause: row[2]
        }));
      }

      // Release the database connection
      await connection.close();
    } catch (error) {
      console.error('Error fetching data from Oracle:', error);
    }
  }
}
