import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { BusquedaComponent } from '../../gifs/busqueda/busqueda.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{


  get historial(){
    return this.GifsService.historial;
  }
  constructor(private GifsService:GifsService){ 

  }
  buscar(item:string){
    this.GifsService.buscarGifs(item);
  }

}
