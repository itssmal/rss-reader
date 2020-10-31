import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../core/services/news.service';
import {RSS, RSSSource} from '../../core/models/rss.interface';
import {Location} from '@angular/common';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public isLoading = false
  public separateMode = false
  public rssSources: RSSSource[]

  @Input('feed') public feed: RSS
  @Output() removedFeed = new EventEmitter<string>()

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private location: Location,
              private router: Router) { }


  ngOnInit(): void {
    if (!this.feed) {
      this.separateMode = true
      this.rssSources = this.newsService.rssSources
      let feedTitle = this.route.snapshot.params['src']
      this.getFeed(feedTitle)
    }
  }

  private async getFeed(feedTitle) {
    this.isLoading = true
    try {
      let req = this.rssSources.filter(el => el.shortTitle === feedTitle)
      this.feed = await this.newsService.getRSS(req[0]).toPromise()
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }

  public openFeed(feed: RSS) {
    this.router.navigate([`/feed/${feed.shortTitle}`])
  }

  public removeFeed(feed:RSS) {
    this.removedFeed.emit(feed.shortTitle)
  }


  public back(): void {
    this.location.back()
  }
}
