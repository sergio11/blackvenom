import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  moduleId: module.id,
  selector: 'gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() images: string[];
  @Output() onLoadMore: EventEmitter<number> = new EventEmitter<number>();

  public options: MasonryOptions = {
    transitionDuration: '0.8s'
  };
  constructor() { }

  ngOnInit() {
  }

}
