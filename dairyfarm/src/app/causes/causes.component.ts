import { Component, OnInit } from '@angular/core';
import { CausesService } from '../causes.service';

interface Cause {
  sno: number;
  disease: string;
  cause: string;
}

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css'],
})
export class CausesComponent implements OnInit {
  tableData: Cause[] = [];
  displayedColumns: string[] = ['sno', 'disease', 'cause', 'edit'];
  showForm: boolean = false;
  editMode: boolean = false;
  formData: Cause = {
    sno: 0,
    disease: '',
    cause: '',
  };

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

  insertData(): void {
    this.causesService.insertCause(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.getCausesData();
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateData(): void {
    this.causesService.updateCause(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.getCausesData();
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteData(sno: number): void {
    this.causesService.deleteCause(sno).subscribe(
      (response) => {
        console.log(response);
        this.getCausesData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editMode = false;
    this.resetForm();
  }
  

  editData(data: Cause): void {
    this.showForm = true;
    this.editMode = true;
    this.formData = { ...data };
  }

  cancelForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      sno: 0,
      disease: '',
      cause: '',
    };
  }
}
