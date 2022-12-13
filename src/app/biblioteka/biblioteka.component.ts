import { Component, OnInit } from '@angular/core';
import { CzasopismaService, Czasopismo, Header } from '../czasopisma.service'

@Component({
  selector: 'app-biblioteka',
  templateUrl: './biblioteka.component.html',
  styleUrls: ['./biblioteka.component.scss']
})
export class BibliotekaComponent implements OnInit {

  czasopismaCount = 0
  displayedComponent: 'headers' | 'categories' | 'czasopisma' = 'headers'
  readonly headers: Header[] = []
  selectedHeader?: string
  categories: string[] = []
  selectedCategory?: string
  czasopisma: Czasopismo[] = []

  constructor(private readonly czasopismaService: CzasopismaService) { }

  async ngOnInit() {
    this.headers.push(...await this.czasopismaService.fetchHeaders())
  }

  async handleHeaderClick(headerName: string): Promise<void> {
    this.categories = await this.czasopismaService.fetchCategories(headerName) as string[]
    this.selectedHeader = headerName
    this.displayedComponent = 'categories'
  }

  async handleCategoryClick(category: string): Promise<void> {
    if (this.selectedHeader === undefined) {
      throw new Error(`Header undefined for category ${category}`)
    }
    this.czasopisma = await this.czasopismaService.fetchCzasopisma(this.selectedHeader, category)
    this.displayedComponent = 'czasopisma'
  }

}
