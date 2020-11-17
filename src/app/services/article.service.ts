import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //peticiones Ajax
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import ServicesCommon from '../Common/services.common';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url: string;  

  constructor(
    private _wsUser : UserService,
    private _http: HttpClient    
  ) {
    this.url=environment.wsUrl;
   }

  getArticles(): Observable<any> {
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.get(this.url + '/articles',{headers: headers});
  }

  getUrl(): string {
    return this.url;
  }

  getArticlesLast(): Observable<any> {
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.get(this.url + '/articles/last',{headers: headers});
  }

  getArticle(id: any): Observable<any>  {
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.get(this.url + '/article/'+id,{headers: headers});
  }
  search(buscado: string) :Observable<any> {
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
     return this._http.get(this.url+'/search'+buscado,{headers: headers});
  }
  getArticlesBySearch(busqueda: string) :Observable<any>{
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.get(this.url+'/search/'+busqueda,{headers: headers});
  }  
  create(article):Observable<any>{
    let params = JSON.stringify(article);
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.post(this.url+'/save',params,{headers: headers});
  }
  update(article:Article):Observable<any>{
     let params = JSON.stringify(article);
     let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
     return this._http.put(this.url+'/article/'+article._id,params,{headers: headers});
  }

  delete(id : string):Observable<any>{
    let headers=ServicesCommon.generateHeaders('application/json',this._wsUser.getToken());
    return this._http.delete(this.url+'/article/'+id,{headers: headers});
 }  

}
