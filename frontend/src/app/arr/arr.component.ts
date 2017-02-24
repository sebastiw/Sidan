import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

class Arr {
    Id: number
    Namn: string
    Datum: Date
    Plats: string
    Deltagare: string
    Hetsade: string
    Kanske: string
}


@Component({
  selector: 'app-arr',
  templateUrl: './arr.component.html',
  styleUrls: ['./arr.component.css']
})
export class ArrComponent implements OnInit {

    arrs: Arr[];

  constructor(private http: Http) { }

    ngOnInit() {
        this.arrs = [];
        this.getArrs().subscribe(
            arrs => {
                console.log("Received " + arrs.length + " arrs");
                this.arrs = arrs;
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }
    getArrs() {
        return this.http.get('/json/arrs').map(res => res.json());
    }

    fixDate(dateStr) {
        var match = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)/.exec(dateStr);
        return new Date(Number(match[1]),
                        Number(match[2]) - 1,
                        Number(match[3]),
                        Number(match[4]),
                        Number(match[5]));
    }
}
