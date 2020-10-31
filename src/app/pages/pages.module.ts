import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {
  NbAccordionModule,
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule, NbUserModule
} from '@nebular/theme';
import { FeedComponent } from './feed/feed.component';
import { RssComponent } from './home/rss/rss.component';
import { ArticleComponent } from './article/article.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, FeedComponent, RssComponent, ArticleComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    NbIconModule,
    NbAccordionModule,
    NbLayoutModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAlertModule,
    NbUserModule,
  ],
})
export class PagesModule { }
