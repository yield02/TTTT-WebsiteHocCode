import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCaretDown, ionCaretUp } from '@ng-icons/ionicons';
import { TopicComponent } from './topic/topic.component';

@Component({
    selector: 'forum-topics',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        TopicComponent
    ],
    providers: [provideIcons({
        ionCaretDown,
        ionCaretUp,
    })],
    templateUrl: './topics.component.html',
    styleUrl: './topics.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicsComponent {

    @Input() index!: number;
    isCollapsed: boolean = false;

    constructor() {
        if (this.index === 1) {
            this.isCollapsed = true;
        }
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
