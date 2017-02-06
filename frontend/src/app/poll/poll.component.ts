import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

class Poll {
    Id: number
    Question: string
    Yae: string
    Nay: string
    Date: Date
    NrYae: number
    NrNay: number
}

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

    polls: Poll[];

    constructor(private http: Http) { }

    ngOnInit() {
        this.polls = [];
        this.getPoll().subscribe(
            polls => {
                this.polls = polls;
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }

    getPoll() {
        return this.http.get('/json/poll').map(res => res.json());
    }
}
