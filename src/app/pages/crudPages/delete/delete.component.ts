import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  private image: string;
  public mensaje: string;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _uService: UserService,
    private _router: Router,
    private _imageService: ImageService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.image = params.image;
      this.deleteArticle(id);
    });
  }

  deleteArticle(id) {
    this._articleService.delete(id).subscribe(
      response => {
        if (response.ok == false) {
          if (response.loguot) this._uService.logout();
          this.mensaje = response.message;
        }

        if (response.status && response.status != "error") {
          if (this.image != "") {

            this._imageService.deleteImage(this.image).subscribe(res => { },
              error => {
                console.log(`Error al intentar borrar la imagen  -"${this.image}"-`);
                console.log(error);
              }
            );
          }
          this._router.navigate(['/crud']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
