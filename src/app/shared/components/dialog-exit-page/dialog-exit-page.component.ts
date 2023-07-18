import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exit-page',
  templateUrl: './dialog-exit-page.component.html',
  styleUrls: ['./dialog-exit-page.component.scss'],
})
export class DialogExitPageComponent {
  constructor(public dialogRef: MatDialogRef<DialogExitPageComponent>) {}

  closeDialog(value: boolean): void {
    this.dialogRef.close(value);
  }
}
