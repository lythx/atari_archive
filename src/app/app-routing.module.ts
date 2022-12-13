import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotekaRoutingComponent } from './biblioteka-routing/biblioteka-routing.component';
import { BibliotekaComponent } from './biblioteka/biblioteka.component';
import { CzasopismaRoutingComponent } from './czasopisma-routing/czasopisma-routing.component';
import { KategorieRoutingComponent } from './kategorie-routing/kategorie-routing.component';
import { ZarobkiComponent } from './zarobki/zarobki.component';

const routes: Routes = [
  { path: 'biblioteka', component: BibliotekaComponent },
  { path: 'zarobki', component: ZarobkiComponent },
  { path: ':nazwa/:kategoria', component: CzasopismaRoutingComponent },
  { path: ':nazwa', component: KategorieRoutingComponent },
  { path: '', component: BibliotekaRoutingComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
