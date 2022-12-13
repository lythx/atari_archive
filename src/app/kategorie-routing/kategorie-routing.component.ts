import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CzasopismaService } from '../czasopisma.service';

@Component({
  selector: 'app-kategorie-routing',
  templateUrl: './kategorie-routing.component.html',
  styleUrls: ['./kategorie-routing.component.scss']
})
export class KategorieRoutingComponent implements OnInit {

  categories: string[] = []

  constructor(private activatedRoute: ActivatedRoute,
    public czasopismaService: CzasopismaService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(async url => {
      const response = await this.czasopismaService.fetchCategories(url[0].path)
      if (response instanceof Error) {
        this.router.navigateByUrl('')
        return
      }
      this.categories = response
    })
  }

}
