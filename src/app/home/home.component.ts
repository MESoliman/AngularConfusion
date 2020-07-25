import { Component, OnInit, Inject } from "@angular/core";
import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { Dish } from "../shared/dish";
import { Promotion } from "../shared/promotion";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { flyInOut, expand } from "../animations/app.animation";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;",
  },
  animations: [flyInOut(), expand()],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMsg: string;
  leaderErrMsg: string;
  promotionErrMsg: string;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject("BaseURL") private BaseURL
  ) {}

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(
      (dish) => (this.dish = dish),
      (errmsg) => (this.dishErrMsg = <any>errmsg)
    );
    this.promotionService.getFeaturedPromotion().subscribe(
      (promotion) => (this.promotion = promotion),
      (errmsg) => (this.promotionErrMsg = <any>errmsg)
    );
    this.leaderService.getFeaturedLeader().subscribe(
      (leader) => (this.leader = leader),
      (errmsg) => (this.leaderErrMsg = <any>errmsg)
    );
  }
}
