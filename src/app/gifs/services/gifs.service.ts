import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'cTkNCVXfXj0jdpgfM7H3QGQt9ZqtkWXg';
  private _historial: string[] = [];

  //TO DO CAMBIAR ANY POR SU TIPO CORRESPONDIENTE
  public resultados: any[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs(query:string = ''){
    
    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial  = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=cTkNCVXfXj0jdpgfM7H3QGQt9ZqtkWXg&q=${query}&limit=10&offset=0&rating=g&lang=en`)
    .subscribe((resp:any )=> {
      console.log(resp.data);
      this.resultados = resp.data;
    });
  }

}
