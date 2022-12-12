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
  readonly headers: Header[] = []

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

  private getHeadersFromXml() {
    const response = this.czasopismaXml.evaluate(`/czasopisma/zmienne/`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    let node = response.iterateNext()
    while (node !== null) {
      console.log(node.childNodes)
      node = response.iterateNext()
    }
  }

}
