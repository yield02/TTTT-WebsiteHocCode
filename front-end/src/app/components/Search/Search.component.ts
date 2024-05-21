import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './Search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchResult') searchResultContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  searchControl: FormControl = new FormControl('');

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.searchContainer.nativeElement.contains(e.target as Node)) {
        this.searchResultContainer.nativeElement.hidden = true;
      }
    })
  }

  ngAfterViewInit(): void {
    this.searchResultContainer.nativeElement.hidden = true;
  }
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((result) => {

    });
  }
  onFocus() {
    this.searchResultContainer.nativeElement.hidden = false;
  }

}
