import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Header {
  name: string
  image: string
}
export interface Czasopismo {
  miniaturka: string
  format: string
  strony: number
  nazwa: string
  wydawca: number
  skan: string
  przetworzenie: string
  podeslal: string
}

@Injectable({
  providedIn: 'root'
})
export class CzasopismaService {

  private isInitialized = false
  private czasopismaXml!: Document
  private readonly headers: Header[] = []

  constructor(private httpClient: HttpClient) { }

  async fetchHeaders(): Promise<Header[]> {
    if (!this.isInitialized) { await this.initialize() }
    return this.headers
  }

  async fetchCategories(headerName: string): Promise<string[]> {
    if (!this.isInitialized) { await this.initialize() }
    const response = this.czasopismaXml.evaluate(`/czasopisma/lata/${headerName}`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    const node = response.iterateNext()
    if (node === null) { throw new Error(`Node is null for header ${headerName}`) }
    return (node.textContent as string).split(',')
  }

  async fetchCzasopisma(headerName: string, category: string): Promise<Czasopismo[]> {
    if (!this.isInitialized) { await this.initialize() }
    console.log(headerName)
    const response = this.czasopismaXml.evaluate(`/czasopisma[starts-with(${headerName})]`,
      this.czasopismaXml, null, XPathResult.ANY_TYPE);
    console.log(response)
    let node = response.iterateNext()
    const czasopisma: Czasopismo[] = []
    while (node !== undefined) {
      console.log(node)
      node = response.iterateNext()
    }
    return []
  }

  private initialize(): Promise<void> {
    return new Promise((resolve) => {
      this.httpClient.get("./assets/czasopisma.xml", {
        responseType: 'text'
      }).subscribe(async (data) => {
        const parser = new DOMParser();
        this.czasopismaXml = parser.parseFromString(data, "text/xml");
        await this.initializeHeaders()
        resolve()
      })
    })
  }

  private initializeHeaders(): Promise<void> {
    return new Promise(async (resolve) => {
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
      resolve()
    })
  }

}
