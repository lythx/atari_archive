import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Header {
  name: string
  image: string
}
export interface CzasopismaInfo {
  name: string
  image: string
  categories: string[]
}
export interface Czasopismo {
  miniaturka: string
  format: string
  stron: number
  nazwa: string
  wydawca: string
  numer: string
  skan: string
  plik: string
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
  private readonly czasopismoKeys: (keyof Czasopismo)[] = ['miniaturka', 'format',
    'stron', 'nazwa', 'wydawca', 'skan', 'przetworzenie', 'podeslal', 'plik', 'numer']

  constructor(private httpClient: HttpClient) { }

  async fetchHeaders(): Promise<Header[]> {
    if (!this.isInitialized) { await this.initialize() }
    return this.headers
  }

  async updateCzasopismo(originalName: string, name: string, image: string, categories: string[]) {

  }

  async deleteCzasopismo(name: string): Promise<void> {
    
  }

  async fetchCzasopismaInfo(): Promise<CzasopismaInfo[]> {
    if (!this.isInitialized) { await this.initialize() }
    const headersAndCategories: CzasopismaInfo[] = []
    for (const header of this.headers) {
      const categories = await this.fetchCategories(header.name)
      if (categories instanceof Error) {
        throw new Error(`Category error when fetching categories and headers ${categories.message}`)
      }
      headersAndCategories.push({
        name: header.name,
        image: header.image,
        categories
      })
    }
    return headersAndCategories
  }

  async fetchCategories(headerName: string): Promise<string[] | Error> {
    if (!this.isInitialized) { await this.initialize() }
    let response: XPathResult
    try {
      response = this.czasopismaXml.evaluate(`/czasopisma/lata/${headerName}`,
        this.czasopismaXml, null, XPathResult.ANY_TYPE)
    } catch (err) {
      return new Error('Error while evaluating xml request')
    }
    const node = response.iterateNext()
    if (node === null) { return new Error(`Node is null for header ${headerName}`) }
    return (node.textContent as string).split(',')
  }

  async fetchCzasopisma(headerName: string, category: string): Promise<Czasopismo[]> {
    if (!this.isInitialized) { await this.initialize() }
    let response: XPathResult
    try {
      response = this.czasopismaXml.evaluate(`/czasopisma/${headerName}/*[@rok='${category}' and not(boolean(@brak))]`,
        this.czasopismaXml, null, XPathResult.ANY_TYPE);
    } catch (err) {
      return []
    }
    let node = response.iterateNext()
    const czasopisma: Czasopismo[] = []
    while (node !== null) {
      const czasopismoObj = {} as any
      for (const e of Array.from(node.childNodes)) {
        if (this.czasopismoKeys.includes(e.nodeName as keyof Czasopismo)) {
          czasopismoObj[e.nodeName] = e.textContent
        }
      }
      czasopismoObj.stron = Number(czasopismoObj.stron)
      czasopisma.push(czasopismoObj as Czasopismo)
      node = response.iterateNext()
    }
    return czasopisma
  }

  private initialize(): Promise<void> {
    this.isInitialized = true
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
