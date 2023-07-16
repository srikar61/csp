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
  editedRowIndex: number | null = null;

  constructor(private causesService: CausesService) {}

  ngOnInit(): void {
    this.getCausesData();
  }

  getCausesData(): void {
    this.causesService.getCausesData().subscribe(
      (data: Cause[]) => {
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
        this.toggleForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateData(): void {
    if (this.editMode && this.editedRowIndex !== null && this.editedRowIndex >= 0) {
      const updatedData = this.tableData[this.editedRowIndex];
      this.causesService.updateCause(updatedData).subscribe(
        (response) => {
          console.log(response);
          this.getCausesData();
          this.resetForm();
          this.editedRowIndex = null;
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  editData(data: Cause, index: number): void {
    if (this.editMode && this.editedRowIndex !== null) {
      this.updateData();
    }
    this.showForm = false;
    this.editMode = true;
    this.formData = { ...data };
    this.editedRowIndex = index;
  }

  cancelForm(): void {
    if (this.editMode && this.editedRowIndex !== null) {
      this.editedRowIndex = null;
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formData = {
      sno: 0,
      disease: '',
      cause: '',
    };
  }
}
