import {Component, Input, OnInit} from '@angular/core';
import {RSS, RSSItem} from '../../../core/models/rss.interface';
import {Router} from '@angular/router';
import {ArticleService} from '../../../core/services/article.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss']
})
export class RssComponent implements OnInit {

  @Input('rss') public rss: RSS
  constructor(private router: Router,
              private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  public openArticle(item: RSSItem): void {
    this.articleService.setDetails(item)
    this.router.navigate([`article/${item.title}`])
  }
}
