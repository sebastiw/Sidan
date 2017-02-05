
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Entry } from '../entry';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  private _take = 30;
  @Input()
  set take(take: number) {
    this._take = take || 30;
  }
  get take(): number { return this._take; }

	entries: Entry[];

  constructor(private http: Http) { }

  ngOnInit() {
  	this.entries = [];

  	this.getEntries()
  	.subscribe(
      entries => {
        this.entries = entries.map(entry => {
          entry.Date = entry.Date.substr(0, 10);
          return entry;
        });
      },
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  getEntries() {
  	return this.http.get('/json/entries?take='+this._take)
  	.map(res => res.json());
  }

}
