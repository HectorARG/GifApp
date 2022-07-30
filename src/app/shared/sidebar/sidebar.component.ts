import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  HistorialBusqueda: string[] = [];

  constructor(private gifsService: GifsService) { }


  get historial(): string[]{    
    return this.gifsService.historial
  }

}
