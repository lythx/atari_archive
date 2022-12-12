import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
    const response = this.czasopismaXml.evaluate(`/czasopisma/zmienne/*/src`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    let node = response.iterateNext()
    while (node !== null) {
      for (const imageNode of Array.from(node.childNodes)) {
        this.images.push(imageNode.textContent as string)
      }
      node = response.iterateNext()
    }
  }

}
