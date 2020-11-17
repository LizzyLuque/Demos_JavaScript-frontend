import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public article: Article;
  public fileThumb: any;
  //public status: string;
  public titulo:string;
  public modal:string;
  public file: any;  
  public mensaje: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _imageUploader: ImageService    
  ) {
    this.article = new Article(null, "", "", null, null);    
    this.titulo= "Crear Artículo";    
   }

  ngOnInit(): void {
  }

  fileChangeEvent(e) {
    this.file =<Array<File>> e.target.files;
    var reader = new FileReader();
    reader.onload = (_event) => {
      this.fileThumb = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  onSubmit(form) {
    this._articleService.create(this.article).subscribe(
      res => {
        if (res.status == "success") {
          //this.status = "success";
          this.article = res.article;
          if (this.file) {
             //subir imagen
             this._imageUploader.makeFileRequest("/upload-image/"+res.article._id,[],
             this.file,'image').then((resImg:any)=>{
               if(resImg.article){} //ya se atualizó
               else if(resImg.image){
                  console.log(resImg.image);
               }

             });
          }
          this.modal="El artículo fue guardado correctamente";
          //document.getElementById("openModalButton").click();
        } else {
          //this.status = "error";
        }
      },
      err => {
        console.log(err);
        //this.status = "error";
      });
  }  

}
