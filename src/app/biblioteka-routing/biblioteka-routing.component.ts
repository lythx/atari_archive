import { Component } from '@angular/core';
import { CzasopismaService, Header } from '../czasopisma.service';

@Component({
  selector: 'app-biblioteka-routing',
  templateUrl: './biblioteka-routing.component.html',
  styleUrls: ['./biblioteka-routing.component.scss']
})
export class BibliotekaRoutingComponent {
  
  readonly headers: Header[] = []

  constructor(private readonly czasopismaService: CzasopismaService) { }

  async ngOnInit() {
    this.headers.push(...await this.czasopismaService.fetchHeaders())
  }

}
