import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEllipsisHorizontalOutline, ionSendOutline } from '@ng-icons/ionicons';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    NgIconComponent,
    InputTextareaModule,
    FormsModule,
    SpeedDialModule
  ],
  providers: [provideIcons({ ionEllipsisHorizontalOutline, ionSendOutline })],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  items: MenuItem[];
  replyValue: String = '';
  isReply: boolean = false;


  constructor() {
    this.items = [

      {
        tooltipOptions: {
          tooltipLabel: 'Chỉnh sửa',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-pencil',
        command: () => {
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Xóa',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-trash',
        command: () => {
        }
      },
      {
        icon: 'pi pi-flag',
        tooltipOptions: {
          tooltipLabel: 'Báo cáo',
          tooltipPosition: 'left'
        }
      },

    ];;
  }

  ngOnInit(): void {

  }

  toggleIsReply(): void {
    this.isReply = !this.isReply;
  }
}
