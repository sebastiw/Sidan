import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

class Article {
    Id: number
    Header: string
    Body: string
    Date: Date
}


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    articles: Article[];

    constructor(private http: Http) { }

    ngOnInit() {
        this.articles = [];
        this.getArticles().subscribe(
            articles => {
                this.articles = articles;
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }
    getArticles() {
        return this.http.get('/json/articles').map(res => res.json());
    }
}
