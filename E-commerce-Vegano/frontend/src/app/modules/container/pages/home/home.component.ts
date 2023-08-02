import {Component, inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Plate} from '@shared/interfaces/plate.interface';
import {SliderItem} from '@shared/interfaces/slider-item.interface';
import {PlateService} from '@shared/services/plate.service';
import {PlateActions} from "@modules/container/store/actions/plates.actions";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private plateService = inject(PlateService);

  homeSearch = new FormControl('');

  faMagnifyingGlass = faMagnifyingGlass;

  plateList: Plate[] = [];

  slides: SliderItem[] = [];

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.getPlateList();
    this.getHomeSlides();
  }

  getPlateList() {

    this.plateService.listarPlatos()
      .subscribe({
        next: (rpta) => {
          this.plateList = rpta
          console.log("rpta =>", rpta)
        },
        error: (message) => {
          console.log("error =>", message);
        }
      })
  }

  getHomeSlides() {
    this.slides = [
      {
        title: "First slide label",
        description: "Some representative placeholder content for the slide.",
        imageUrl: "https://picsum.photos/id/944/900/500"
      },
      {
        title: "Second slide label",
        description: "Some representative placeholder content for the slide.",
        imageUrl: "https://picsum.photos/id/1011/900/500"
      },
      {
        title: "Third slide label",
        description: "Some representative placeholder content for the slide.",
        imageUrl: "https://picsum.photos/id/984/900/500"
      }
    ];
  }

  selectedPlate(plate: Plate) {

    this.store.dispatch(PlateActions.setSelected({plateSelected: plate}))
    this.router.navigateByUrl('/container/descripcion');

  }

}
