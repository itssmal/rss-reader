import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RSS, RSSSource} from '../models/rss.interface';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private rssToJson = 'https://rss2json.com/api.json?rss_url='
  public rssSources: RSSSource[] = environment.rssSources

  constructor(private http: HttpClient) { }

  public async getRSSFeed(rssSources: RSSSource[]): Promise<RSS[]> {
    const res: RSS[] = []
    for (let rss of rssSources) {
      res.push(await this.getRSS(rss).toPromise())
    }
    res.push(await this.getArticles().toPromise())
    return res
  }

  getRSS(rss: RSSSource): Observable<RSS> {
    return this.http.get<RSS>(`${this.rssToJson + rss.link}`)
      .pipe(map(el => {
        el.shortTitle = rss.shortTitle
        return el
      }))
  }

  getArticles(): Observable<RSS> {
    return this.http.get<RSS>(`${environment.api_url}/posts?userId=1`)
      .pipe(map(res => this.convertArticles(res)))
  }

  deleteArticles(): Observable<any> {
    return this.http.delete(`${environment.api_url}/posts/1`)
  }

  private convertArticles(articles): RSS {
    let body: RSS = {feed: {title: 'posts'}, items: [], shortTitle: 'posts'}
    for (let article of articles) {
      body.items.push({
        title: article.title,
        description: article.body
      })
    }
    return body
  }

}
