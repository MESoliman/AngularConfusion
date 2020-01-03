import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dishService.getDish(id).then(
      dish => this.dish = dish
    );
  }

  goBack() {
    this.location.back();
  }

}
