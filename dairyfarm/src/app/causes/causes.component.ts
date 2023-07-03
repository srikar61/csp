import { Component, OnInit } from '@angular/core';
import { CausesService } from '../causes.service';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css'],
})
export class CausesComponent implements OnInit {
  tableData: any[] = [];
  displayedColumns: string[] = ['sno', 'disease', 'cause', 'edit'];
  newCause: any = {};

  constructor(private causesService: CausesService) {}

  ngOnInit(): void {
    this.getCausesData();
  }

  t1: any;

  show() {
    this.t1 = document.querySelector('.t1');
    const t1DisplayStyle = window.getComputedStyle(this.t1).getPropertyValue('display');
    if (t1DisplayStyle === 'none') {
      this.t1.style.display = 'block';
    } else {
      this.t1.style.display = 'none';
    }
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

  insertData(cause: any) {
    this.causesService.insertCause(cause).subscribe(
      (response) => {
        // Handle the successful insert
        console.log(response);
        this.getCausesData(); // Refresh the data after insertion
        this.resetForm();
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  updateData(cause: any) {
    this.causesService.updateCause(cause).subscribe(
      (response) => {
        // Handle the successful update
        console.log(response);
        this.getCausesData(); // Refresh the data after update
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  deleteData(id: number) {
    this.causesService.deleteCause(id).subscribe(
      (response) => {
        // Handle the successful deletion
        console.log(response);
        this.getCausesData(); 
        console.log(this.tableData);// Refresh the data after deletion
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  resetForm() {
    this.newCause = {};
    window.location.reload();
  }
}
