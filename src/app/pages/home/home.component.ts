import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NewsService} from '../../core/services/news.service';
import {RSS, RSSSource} from '../../core/models/rss.interface';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../../core/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public news: RSS[] = []
  public isLoading = false
  public alertText: string
  public rssSources: RSSSource[]
  public creatingRSS = false

  @Input('dialog') public dialog: TemplateRef<any>

  public articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  })

  public rssForm = new FormGroup({
    shortTitle: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
  })

  constructor(private newsService: NewsService,
              private router: Router,
              private dialogService: NbDialogService,
              private articleService: ArticleService) { }

  public ngOnInit(): void {
    this.rssSources = this.newsService.rssSources
    this.getNews()
  }

  private async getNews(): Promise<void> {
    try {
      this.isLoading = true
      this.news = await this.newsService.getRSSFeed(this.rssSources)
      console.log(this.news)
    } catch (e) {
      this.alertText = e?.error?.message
    } finally {
      this.isLoading = false
    }
  }

  public async removeFeed(index) {
    try {
      await this.newsService.deleteArticles().toPromise()
    } catch (e) {
      this.alertText = e?.error?.message
    } finally {
      this.news.splice(index, 1)
    }
  }

  public openPostDialog(template) {
    this.creatingRSS = false
    this.dialogService.open(template, {autoFocus: false})
  }

  public openRSSDialog(template) {
    this.creatingRSS = true
    this.dialogService.open(template, {autoFocus: false})
  }

  public onDialogClose() {
    this.creatingRSS ? this.addRSS() : this.createPost()
  }

  public async createPost(): Promise<void> {
    try {
      let res = await this.articleService.newArticle(this.articleForm.value).toPromise()
    } catch (e) {
      this.alertText = e.error.message
    } finally {
      this.alertText = 'Successfully Created'
    }
  }

  public async addRSS() {
    this.isLoading = true
    try {
      this.rssSources.unshift(this.rssForm.value)
      await this.getNews()
    } catch (e) {
      this.alertText = e?.error?.message
    } finally {
      this.alertText = 'Subscribed'
    }
  }
}
