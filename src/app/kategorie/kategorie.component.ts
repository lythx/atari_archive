import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.scss']
})
export class KategorieComponent  {

  @Input('kategorie') categories: string[] = [];
  @Output() onCategoryClick = new EventEmitter<string>();

  handleButtonClick(category: string) {
    this.onCategoryClick.emit(category)
  }
}
