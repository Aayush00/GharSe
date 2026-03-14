import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searching-component',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './searching-component.html',
  styleUrl: './searching-component.css'
})
export class SearchingComponent implements OnInit {
  query = '';
  dishes: any[] = [];
  chefs: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];

      if (this.query && this.query.length >= 2) {
        this.fetchResults();
      }
    });
  }

  fetchResults(): void {
    this.loading = true;

    this.http.get<any>('http://localhost:8080/api/search', {
      params: { q: this.query }
    }).subscribe({
      next: res => {
        this.dishes = res.dishes || [];
        this.chefs = res.chefs || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
