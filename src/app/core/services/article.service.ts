import { Injectable } from '@angular/core';
import {RSSItem} from '../models/rss.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articleDetails: RSSItem

  constructor(private http: HttpClient) { }

  public newArticle(body): Observable<any> {
    return this.http.post(`${environment.api_url}/posts`, body)
  }

  getDetails() {
    return this.articleDetails || JSON.parse(localStorage.getItem('lastArticle'))
  }

  setDetails(req) {
    localStorage.setItem('lastArticle', JSON.stringify(req))
    return this.articleDetails = req
  }

  removeDetails() {
    this.articleDetails = null
  }

}
