import { Component, OnInit } from '@angular/core';
import { DiseasesService } from '../diseases.service';

interface Disease {
  sno: number;
  disease: string;
  symptoms: string;
}

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css'],
})
export class DiseasesComponent implements OnInit {
  tableData: Disease[] = [];
  displayedColumns: string[] = ['sno', 'disease', 'symptoms', 'edit'];
  showForm: boolean = false;
  editMode: boolean = false;
  formData: Disease = {
    sno: 0,
    disease: '',
    symptoms: '',
  };

  constructor(private diseasesService: DiseasesService) {}

  ngOnInit(): void {
    this.getDiseasesData();
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

  insertData(): void {
    this.diseasesService.insertDisease(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.getDiseasesData();
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateData(): void {
    this.diseasesService.updateDisease(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.getDiseasesData();
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteData(sno: number): void {
    this.diseasesService.deleteDisease(sno).subscribe(
      (response) => {
        console.log(response);
        this.getDiseasesData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cancelForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
  sno: 0,
  disease: '',
  symptoms: '',
};
  }

  editData(data: Disease): void {
    this.showForm = true;
    this.editMode = true;
    this.formData = { ...data };
  }
}
