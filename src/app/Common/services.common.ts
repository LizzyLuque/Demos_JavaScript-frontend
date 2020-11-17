import { HttpHeaders } from '@angular/common/http';  

export default class ServicesCommon {
    constructor() { }

      static generateHeaders(content:string, token:string){
        let headers = new HttpHeaders()
        .set("Content-Type", content)
        .set(
          'Authorization', `Bearer ${token}`);
        return headers;
      }
}