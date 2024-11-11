import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-list-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-list-chat.component.html',
  styleUrl: './home-list-chat.component.scss'
})
export class HomeListChatComponent {
  @Input() listUser: any = [];
}
