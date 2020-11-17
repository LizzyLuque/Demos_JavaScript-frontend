import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        private _http: HttpClient
    ) { }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        let finalurl = environment.wsUrl + url;
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            let i: number;
            for (i = 0; i < files.length; i++) { //subir multiples archivos
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', finalurl, true);
            xhr.send(formData);
        });
    }

    deleteImage(imageName: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(environment.wsUrl + '/delete-image/' + imageName, { headers: headers });
    }
}
