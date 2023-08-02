import {Component, Input, OnInit} from '@angular/core';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {faStar as faNoFilled} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;

  faStarNoFilled = faNoFilled
  faStarFilled = faStar;
  faStarHalfAlt = faStarHalfAlt;

  stars: { filled: boolean, halfFilled: boolean }[] = [];

  ngOnInit() {
    const filledStars = Math.floor(this.rating / 2);
    const hasHalfStar = this.rating % 2 === 1;


    for (let i = 0; i < 5; i++) {
      let star = {
        filled: i < filledStars,
        halfFilled: i == filledStars && hasHalfStar
      }
      this.stars.push(star)


    }


  }
}
