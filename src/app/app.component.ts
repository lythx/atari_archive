import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'atari_archive';
  date!: number
  input!: string
  displayGrid = false
  czasopismaXml!: Document
  readonly validationRegExp = /^[0-9]*$/

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    setInterval(() => {
      this.date = Date.now()
    }, 300)
    const params = new HttpParams(

    )
    this.httpClient.get("./assets/czasopisma.xml", {
      params,
      responseType: 'text'
    }).subscribe((data) => {
      const parser = new DOMParser();
      this.czasopismaXml = parser.parseFromString(data, "text/xml");
    })
  }

  handleInput() {
    // TODO VALIDATE

    if (this.input === '666.666') {
      this.displayGrid = true
    }
  }

}
