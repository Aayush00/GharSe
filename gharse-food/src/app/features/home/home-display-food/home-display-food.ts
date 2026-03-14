import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-display-food',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-display-food.html',
  styleUrls: ['./home-display-food.css'],
})
export class HomeDisplayFood {

  foods: any[] = [];
  page = 0;
  pageSize = 8;
  isLoading = false;
  hasMore = true;

  constructor(private http: HttpClient) {
    this.loadMore();
  }

  /* RANDOM FOOD IMAGE GENERATOR */

  getRandomImage(i: number): string {
    return `https://picsum.photos/400/300?random=${i+1}`;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.isLoading &&
      this.hasMore
    ) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.isLoading = true;

    this.http
      .get<any[]>(`http://localhost:8080/api/home/foods?page=${this.page}&size=${this.pageSize}`)
      .subscribe((res) => {

        if (res.length === 0) {
          this.hasMore = false;
        } else {
          this.foods.push(...res);
          this.page++;
        }

        this.isLoading = false;
      });
  }
}