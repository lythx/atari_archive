import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'atari_archive';
  date: number | undefined

  ngOnInit() {
    setInterval(() => {
      this.date = Date.now()
    }, 300)
  }

}
