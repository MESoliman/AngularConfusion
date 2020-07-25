import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { flyInOut, expand } from "../animations/app.animation";
import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;",
  },
  animations: [flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  errMsg: string;
  submittedFeedback: Feedback;
  contactType = ContactType;
  @ViewChild("fform") feedbackFormDirective;
  submittingFlag = 0;

  formErrors = {
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
  };

  validationMessages = {
    firstname: {
      required: "First name is required.",
      minlength: "First name must be at least 2 characters long.",
      maxlength: "First name cannot be more than 25 characters.",
    },
    lastname: {
      required: "Last name is required.",
      minlength: "Last name must be at least 2 characters long.",
      maxlength: "Last name cannot be more than 25 characters.",
    },
    telnum: {
      required: "Tel. number is required.",
      pattern: "Tel. number must contain only numbers.",
    },
    email: {
      required: "Email is required.",
      pattern: "Email not in valid format.",
    },
  };

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ["", [Validators.required, Validators.email]],
      agree: false,
      contacttype: "None",
      message: "",
    });

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + "";
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.submittingFlag = 1;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.addFeedback(this.feedback).subscribe(
      (feedback) => {
        console.log(feedback);
        if (feedback) {
          this.submittedFeedback = feedback;
          this.submittingFlag = 2;
          new Promise((resolve) => {
            setTimeout(() => resolve((this.submittingFlag = 0)), 5000);
          });
        }
      },
      (errMsg) => {
        this.errMsg = <any>errMsg;
      }
    );
    this.feedbackForm.reset({
      firstname: "",
      lastname: "",
      telnum: 0,
      email: "",
      agree: false,
      contacttype: "None",
      message: "",
    });
    this.feedbackFormDirective.resetForm();
  }
}
