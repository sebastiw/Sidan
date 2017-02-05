
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';


class Entry {
	Signature: string
	Message: string
	Time: string
	Date: Date
	Enheter: number
	Status: number
	Likes: string
	Id: number
	Secret: boolean
	PersonalSecret: boolean
}


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

	entries: Entry[];

  constructor(private http: Http) { }

  ngOnInit() {
  	this.entries = [];

  	this.getEntries()
  	.subscribe(
      entries => this.entries = entries,
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  getEntries() {
  	return this.http.get('/json/entries')
  	.map(res => res.json());
  }

}
