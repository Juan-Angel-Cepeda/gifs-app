import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.response.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'cTkNCVXfXj0jdpgfM7H3QGQt9ZqtkWXg';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    //localStorage.getItem('historial');
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! );
    }
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }

  }

  buscarGifs(query:string = ''){
    
    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial  = this._historial.splice(0,10);
      
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=cTkNCVXfXj0jdpgfM7H3QGQt9ZqtkWXg&q=${query}&limit=20&offset=0&rating=g&lang=en`)
    .subscribe((resp )=> {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
  }
}
