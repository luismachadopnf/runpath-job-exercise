import { Component, OnInit } from '@angular/core'
import { PhotoService } from '../../services/photo.service'
import { Photo } from '../../models/photo'
import { trigger, style, animate, transition, sequence } from '@angular/animations'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('photosAnimation', [
      transition('void => *', [
        style({ opacity: '0.1' }),
        sequence([
        animate('.3s .5s ease-in', style({ opacity: '1' })),
        ])
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

  p = 1

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

    this.p = 1
  }
}
