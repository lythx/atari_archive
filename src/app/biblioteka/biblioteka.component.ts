import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Header {
  name: string
  image: string
}

@Component({
  selector: 'app-biblioteka',
  templateUrl: './biblioteka.component.html',
  styleUrls: ['./biblioteka.component.scss']
})
export class BibliotekaComponent implements OnInit {

  private czasopismaXml!: Document
  czasopismaCount = 0
  readonly headers: Header[] = []
  headersDisplayed = true

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("./assets/czasopisma.xml", {
      responseType: 'text'
    }).subscribe((data) => {
      const parser = new DOMParser();
      this.czasopismaXml = parser.parseFromString(data, "text/xml");
      this.getHeadersFromXml()
    })
  }

  handleHeaderClick(headerName: string) {
    const response = this.czasopismaXml.evaluate(`/czasopisma/lata/${headerName}`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    const node = response.iterateNext() as Node
    const categories = (node.textContent as string).split(',')
    this.headersDisplayed = false
  }

  private getHeadersFromXml() {
    const response = this.czasopismaXml.evaluate(`/czasopisma/zmienne`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    const node = response.iterateNext() as Node
    for (const e of Array.from(node.childNodes)) {
      if (e.nodeName !== '#text') {
        this.headers.push({
          name: e.nodeName,
          image: e.childNodes[1].textContent as string
        })
      }
    }
  }

}
