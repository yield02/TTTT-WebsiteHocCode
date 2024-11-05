import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSearchOutline } from '@ng-icons/ionicons';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ ionSearchOutline })],
  templateUrl: './search.component.html',
  styleUrl: './Search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchResult') searchResultContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Output() search = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');

  listenChangeSubscription: Subscription | undefined;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.searchContainer.nativeElement.contains(e.target as Node)) {
        if (this.searchResultContainer) {
          this.searchResultContainer.nativeElement.hidden = true;
        }
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.searchResultContainer) {
      this.searchResultContainer.nativeElement.hidden = true;
    }
  }
  ngOnInit(): void {
    this.listenChangeSubscription = this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((result) => {
      this.search.emit(result);
    });
  }
  onFocus() {
    if (this.searchResultContainer) {
      this.searchResultContainer.nativeElement.hidden = false;
    }
  }

  ngOnDestroy(): void {
    this.listenChangeSubscription?.unsubscribe();
  }

}
