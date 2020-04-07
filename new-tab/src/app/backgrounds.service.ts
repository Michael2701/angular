import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundsService{
  private backgrounds: string[] = [
    'https://c4.wallpaperflare.com/wallpaper/28/85/123/space-earth-fantasy-spaceship-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/630/43/768/space-earth-sun-solar-system-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/694/865/147/space-art-fantasy-art-sky-clouds-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/439/852/914/little-prince-universe-science-fiction-fantasy-art-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/891/966/331/spiked-spiky-fantasy-art-fantasy-landscape-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/55/897/164/science-fiction-landscape-space-planet-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/132/314/368/scifi-landscape-science-fiction-space-age-deep-space-wallpaper-preview.jpg'
  ]
  
  choosenBackground = new Subject<string>();

  constructor() { 
  }


  get backGrounds(){
    return this.backgrounds;
  }

}
