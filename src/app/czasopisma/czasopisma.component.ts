import { Component, Input, OnInit } from '@angular/core';
import { Czasopismo } from '../czasopisma.service';

@Component({
  selector: 'app-czasopisma',
  templateUrl: './czasopisma.component.html',
  styleUrls: ['./czasopisma.component.scss']
})
export class CzasopismaComponent implements OnInit {

  @Input() czasopisma: Czasopismo[] = []

  ngOnInit() {
    console.log(this.czasopisma)
    // TODO ROUTING
  }

}
