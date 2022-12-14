import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zarobki',
  templateUrl: './zarobki.component.html',
  styleUrls: ['./zarobki.component.scss']
})
export class ZarobkiComponent {

  readonly title = 'atari_archive';
  date!: number
  inputValue = ''
  displayGrid = false
  readonly gridTriggerValue = '666.666'
  private czasopismaXml!: Document
  readonly images: string[] = []
  private readonly validationRegExp = /[0-9]+(\.[0-9]*)?/

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    setInterval(() => {
      this.date = Date.now()
    }, 300)
    this.httpClient.get("./assets/czasopisma.xml", {
      responseType: 'text'
    }).subscribe((data) => {
      const parser = new DOMParser();
      this.czasopismaXml = parser.parseFromString(data, "text/xml");
      this.getImagesFromXml()
    })
  }

  handleInput(input: HTMLInputElement) {
    input.value = input.value.match(this.validationRegExp)?.[0] ?? ''
    this.inputValue = input.value
    if (this.inputValue === this.gridTriggerValue) {
      this.displayGrid = true
    }
  }

  private getImagesFromXml() {
    const response = this.czasopismaXml.evaluate(`/czasopisma/zmienne`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    const node = response.iterateNext() as Node
    for (const e of Array.from(node.childNodes)) {
      if (e.nodeName !== '#text') {
        this.images.push(e.childNodes[1].textContent as string)
      }
    }
  }


}
