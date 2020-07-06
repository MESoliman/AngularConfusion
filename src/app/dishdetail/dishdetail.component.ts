import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string;
  prev: string;
  next: string;
  CommentForm: FormGroup;
  CommentClass: Comment;
  weight;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'author': '',
    'comment': '',
  };


  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
  };

  constructor(private dishService: DishService,
    private location: Location, private fb: FormBuilder,
    private route: ActivatedRoute) {
      this.createForm();
     }

     createForm() {
      this.CommentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)]],
        comment: ['', [Validators.required]],
        rating: 0
      });
      this.CommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }


    onValueChanged(data?: any) {
      if (!this.CommentForm) { return; }
      const form = this.CommentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + '';
              }
            }
          }
        }
      }
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    let comment: Comment;
    comment = {
      rating: this.CommentForm.value.rating,
      comment: this.CommentForm.value.comment,
      author: this.CommentForm.value.author,
      date: new Date().toISOString()
    };
    this.dish.comments.push(comment);
    this.CommentForm.reset();
    this.weight = 5;
  }

}
