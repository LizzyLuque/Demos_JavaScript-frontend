import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [ArticleService]  
})
export class CrudComponent implements OnInit {
  public urlAS: string;
  public articles: Article[];
  public mensaje:string;
  public result:string;

  constructor(
    private _uService : UserService,
    private _articleService: ArticleService    
  ) {
    this.urlAS=_articleService.getUrl();
    this.result="Cargando...";
   }

   ngOnInit(): void {
    this._articleService.getArticles().subscribe(
      res => {

        if(res.ok==false){
          if(res.loguot) this._uService.logout();
            this.mensaje=res.message;            
        }
        if (res.articles) {          
          this.result="No hay artículos disponibles";
          if(res.articles.length >0)
              this.articles = res.articles;
        }
      },
      err => { console.log(err) }
    );
  }

}
