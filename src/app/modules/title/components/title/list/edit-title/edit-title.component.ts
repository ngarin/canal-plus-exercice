import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss']
})
export class EditTitleComponent implements OnInit {

  public editTitleForm: FormGroup;
  public years: string[];

  constructor(
    public dialogRef: MatDialogRef<EditTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    formBuilder: FormBuilder,
  ) {
    this.years = [];
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this.years.push(i.toString());
    }

    this.editTitleForm = formBuilder.group({
      title: [ this.data[2], Validators.required ],
      year: [ this.data[5], Validators.required ],
      genre: [ this.data[1], Validators.required ],
    });
  }

  public ngOnInit() {}

  public onSubmit() {
    if (this.editTitleForm.status === 'VALID') {
      this.dialogRef.close({ ...this.editTitleForm.value, id: this.data[0] });
    }
  }

}
