import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../new/new.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public article: Article;
  public fileThumb: any;
  //public status: string;
  public titulo: string;
  public modal: string;
  public file: any;
  public mensaje: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uService: UserService,
    private _imageUploader: ImageService
  ) {
    this.article = new Article(null, "", "", null, null);
    this.titulo = "Editar Artículo";

  }

  fileChangeEvent(e) {
    this.file = <Array<File>>e.target.files;
    var reader = new FileReader();
    reader.onload = (_event) => {
      this.fileThumb = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  redirige() {
    this._router.navigate(['/crud']);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getArticle(id);
    });
  }

  getArticle(id) {
    this._articleService.getArticle(id).subscribe(
      res => {        
        if (res.ok == false) {
          if(res.loguot) this._uService.logout();
          this.mensaje = res.message;
        }
        if (res.article) {
          //console.log(res);
          this.article = res.article;
          if (res.article.image != "") {
            this.fileThumb = this._articleService.getUrl() + '/get-image/' + res.article.image;
          }
        }
      }, err => { console.log(err); })
  }

  onSubmit(form) {
    this._articleService.update(this.article).subscribe(
      res => {
        if (res.status == "success") {
          //this.status = "success";
          this.article = res.article;
          if (this.file) {
            //subir imagen
            this._imageUploader.makeFileRequest("/upload-image/" + res.article._id, [],
              this.file, 'image').then((resImg: any) => {
                if (resImg.article) { } //ya se atualizó
                else if (resImg.image) {
                  console.log(resImg.image);
                  //aactualizar articulo
                }

              });
          }
          this.modal = "El artículo fue actualizado correctamente";
          // document.getElementById("openModalButton").click();
        } else {
          //this.status = "error";
        }
      },
      err => {
        //this.status = "error";
        console.log(err);
      });
  }

}
