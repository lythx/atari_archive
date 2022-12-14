import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BibliotekaComponent } from './biblioteka/biblioteka.component';
import { ZarobkiComponent } from './zarobki/zarobki.component';
import { KategorieComponent } from './kategorie/kategorie.component';
import { CzasopismaComponent } from './czasopisma/czasopisma.component';
import { BibliotekaRoutingComponent } from './biblioteka-routing/biblioteka-routing.component';
import { CzasopismaRoutingComponent } from './czasopisma-routing/czasopisma-routing.component';
import { KategorieRoutingComponent } from './kategorie-routing/kategorie-routing.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BibliotekaComponent,
    ZarobkiComponent,
    KategorieComponent,
    CzasopismaComponent,
    BibliotekaRoutingComponent,
    CzasopismaRoutingComponent,
    KategorieRoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
