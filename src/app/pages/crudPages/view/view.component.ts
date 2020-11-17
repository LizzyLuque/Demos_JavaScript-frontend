import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [ArticleService]
})
export class ViewComponent implements OnInit {
  public urlAS: string;
  public article: Article;
  public mensaje: string;

  constructor(
    private _articleService: ArticleService,
    private _uService: UserService,
    private _route: ActivatedRoute
  ) {
    this.urlAS = this._articleService.getUrl();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        res => {
          if (res.ok == false) {
            if(res.loguot) this._uService.logout();
            this.mensaje = res.message;
          }
          if (res.article) {
            this.article = res.article;
          }
        },
        err => { console.log(err) }
      );
    });
  }


}
