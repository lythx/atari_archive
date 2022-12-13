import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.scss']
})
export class KategorieComponent implements OnInit {

  @Input('kategorie') categories: string[] = [];
  @Output() onCategoryClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    // TODO ROUTING
  }

  handleButtonClick(category: string) {
    this.onCategoryClick.emit(category)
  }
}
