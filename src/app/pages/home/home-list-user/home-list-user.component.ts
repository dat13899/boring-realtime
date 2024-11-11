import { Component, Input } from '@angular/core';
import { User } from '../../../shared/signals/signals.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-list-user.component.html',
  styleUrl: './home-list-user.component.scss'
})
export class HomeListUserComponent {
  user = User;
  @Input() listUser: any = [];
}
