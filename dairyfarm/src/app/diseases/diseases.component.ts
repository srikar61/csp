// diseases.component.ts
import { Component, OnInit } from '@angular/core';
import { DiseasesService } from '../diseases.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css'],
})
export class DiseasesComponent implements OnInit {
  tableData: any[] = [];
  newDisease: any = {};
  displayedColumns: string[] = ['sno', 'disease', 'symptoms', 'edit'];
  t1: any;

  constructor(private diseasesService: DiseasesService) {}

  ngOnInit(): void {
    this.getDiseasesData();
  }

  show() {
    this.t1 = document.querySelector('.t1');
    const t1DisplayStyle = window.getComputedStyle(this.t1).getPropertyValue('display');
    if (t1DisplayStyle === 'none') {
      this.t1.style.display = 'block';
    } else {
      this.t1.style.display = 'none';
    }
  }

  getDiseasesData(): void {
    this.diseasesService.getDiseasesData().subscribe(
      (data) => {
        this.tableData = data;
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  insertData(newDisease: any) {
    this.diseasesService.insertDisease(newDisease).subscribe(
      (response) => {
        // Handle the successful insert
        console.log(response);
        this.getDiseasesData(); // Refresh the data after insertion
        this.resetForm();
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  updateData(disease: any) {
    this.diseasesService.updateDisease(disease).subscribe(
      (response) => {
        // Handle the successful update
        console.log(response);
        this.getDiseasesData(); // Refresh the data after update
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  deleteData(id: number) {
    this.diseasesService.deleteDisease(id).subscribe(
      (response) => {
        // Handle the successful deletion
        console.log(response);
        this.getDiseasesData();
        // console.log(this.tableData); // Refresh the data after deletion
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  resetForm() {
    this.newDisease = {};
  }
}
