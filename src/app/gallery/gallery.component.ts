import { Component, OnInit } from '@angular/core'
import { PhotoService } from '../../services/photo.service'
import { Photo } from '../../models/photo'
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  state,
  query

} from '@angular/animations'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('photosAnimation', [
      transition(':enter', [
        query('.card', style({ transform: 'translateX(-1000%)'})),
        query('.card',
          stagger('15ms', [
            animate('100ms 100ms', style({ transform: 'translateX(0)'}))
        ]))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {


  isLoading = true
  photos: Photo[]
  filteredPhotos: Photo[]
  userFilter = ''
  itemsPerPage = 18

  constructor( private photoService: PhotoService ) { }

  ngOnInit() {
    this.getPhotos()
  }

  getPhotos() {
    this.isLoading = true

    this.photoService.getPhotos()
      .subscribe(data => {
        this.photos = data
        this.filteredPhotos = data
        this.isLoading = false
      })
  }

  filterPhotos(event: any) {
    this.filteredPhotos = this.photos.filter(
      photo => photo.title.includes(event)
    )
  }
}
