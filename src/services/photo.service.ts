import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Photo } from '../models/photo'
import { HttpClient } from '../../node_modules/@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private _url = 'http://jsonplaceholder.typicode.com/photos'

  constructor( private http: HttpClient ) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this._url)
  }
}
