import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubscriptionDialogComponent } from './subscription-dialog/subscription-dialog.component';

export interface DialogData {
  email: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionComponent {
  readonly email = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {

    const dialogRef = this.dialog.open(SubscriptionDialogComponent, {
      data: { email: this.email() },
      width: '400px',
      disableClose: false,
      autoFocus: true,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.email.set(result);
        console.log('Email updated to:', this.email());
        alert('Email updated to: ' + this.email());
      }
    });
  }

}
