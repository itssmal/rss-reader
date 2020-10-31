import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../core/services/article.service';
import {RSSItem} from '../../core/models/rss.interface';
import {Location} from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article: RSSItem

  constructor(private articleService: ArticleService,
              private location: Location) { }

  ngOnInit(): void {
    this.article = this.articleService.getDetails()
    console.log(this.article)
  }

  ngOnDestroy() {
    this.articleService.removeDetails()
  }

  public back() {
    this.location.back()
  }

}
