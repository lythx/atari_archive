import { Component, OnInit } from '@angular/core';
import { CzasopismaService, Czasopismo } from '../czasopisma.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-czasopisma-routing',
  templateUrl: './czasopisma-routing.component.html',
  styleUrls: ['./czasopisma-routing.component.scss']
})
export class CzasopismaRoutingComponent implements OnInit {

  czasopisma: Czasopismo[] = []

  constructor(public czasopismaService: CzasopismaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(async url => {
      const response = await this.czasopismaService.fetchCzasopisma(url[0].path, url[1].path)
      if (response.length === 0) {
        this.router.navigateByUrl('')
        return
      }
      this.czasopisma = response
    })
  }

}
