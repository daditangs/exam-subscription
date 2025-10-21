import { Component } from '@angular/core';
import { SubscriptionComponent } from './subscription/subscription.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubscriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'subscription';
}
