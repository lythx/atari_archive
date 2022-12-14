import { Component, OnInit } from '@angular/core';
import { CzasopismaService, CzasopismaInfo } from '../czasopisma.service'

type FormEntry = CzasopismaInfo & { isChanged: boolean }

@Component({
  selector: 'app-edytor',
  templateUrl: './edytor.component.html',
  styleUrls: ['./edytor.component.scss']
})
export class EdytorComponent implements OnInit {

  readonly startingYear = 1960
  hasUnitNumber = false;
  originalCzasopisma: FormEntry[] = []
  czasopisma: FormEntry[] = []
  formType: 'add' | 'edit' = 'edit'
  readonly years: string[] = ['nr specjalny',
    ...new Array(2022 - this.startingYear).fill(null).map((_, i) => String(this.startingYear + i))]
  addName = ''
  addImage = ''
  addCategories: string[] = []

  constructor(public czasopismaService: CzasopismaService) { }

  async ngOnInit(): Promise<void> {
    this.originalCzasopisma = (await this.czasopismaService.fetchCzasopismaInfo())
      .map((a, i) => ({ ...a, id: i, isChanged: false }))
    this.czasopisma = this.originalCzasopisma.map(a => ({ ...a, categories: a.categories.slice() }))
  }

  add() {
    this.czasopisma.push({
      name: this.addName,
      image: this.addImage,
      categories: [...this.addCategories],
      isChanged: false
    })
    this.originalCzasopisma.push({
      name: this.addName,
      image: this.addImage,
      categories: [...this.addCategories],
      isChanged: false
    })
    this.displayEditForm()
  }

  displayEditForm() {
    this.formType = 'edit'
  }

  handleConfirm(index: number, name: string, image: string, categories: string[]) {
    this.czasopisma[index] = {
      name,
      image,
      categories: [...categories],
      isChanged: false
    }
    this.originalCzasopisma[index] = {
      name,
      image,
      categories: [...categories],
      isChanged: false
    }
  }

  async handleFormChange(index: number) {
    await new Promise((r) => setTimeout(r, 1))
    const changed = this.czasopisma[index]
    const original = this.originalCzasopisma[index]
    changed.isChanged = !(changed.name === original.name && changed.image === original.image
      && this.isEqual(changed.categories, original.categories))
  }

  isChanged(index: number): boolean {
    return this.czasopisma[index].isChanged
  }

  displayAddForm() {
    this.formType = 'add'
  }

  async handleDelete(i: number) {
    this.czasopisma.splice(i, 1)
    this.originalCzasopisma.splice(i, 1)
  }

  private isEqual(arr1: string[], arr2: string[]) {
    for (const e of arr1) {
      if (!arr2.includes(e)) {
        return false
      }
    }
    for (const e of arr2) {
      if (!arr1.includes(e)) {
        return false
      }
    }
    return true
  }

}
