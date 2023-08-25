import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../models/DialogData.model';

@Component({
  selector: 'app-dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrls: ['./dialog-generic.component.scss'],
})
export class DialogGenericComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogGenericComponent>
  ) {}

  onSubmit(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
