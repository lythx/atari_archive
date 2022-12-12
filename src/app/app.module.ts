import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BibliotekaComponent } from './biblioteka/biblioteka.component';
import { Route, RouterModule } from '@angular/router';
import { ZarobkiComponent } from './zarobki/zarobki.component';

const routes: Route[] = [
  { path: 'biblioteka', component: BibliotekaComponent },
  { path: 'zarobki', component: ZarobkiComponent },
  { path: '', redirectTo: '/biblioteka', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    BibliotekaComponent,
    ZarobkiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
