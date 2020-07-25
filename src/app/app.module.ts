import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material";
import { AppComponent } from "./app.component";

import "hammerjs";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { DishService } from "./services/dish.service";
import { ProcessHTTPmsgService } from "./services/process-httpmsg.service";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import { LoginComponent } from "./login/login.component";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { baseURL } from "./shared/baseUrl";
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPmsgService,
    { provide: "BaseURL", useValue: baseURL },
  ],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
