import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.response.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'cTkNCVXfXj0jdpgfM7H3QGQt9ZqtkWXg';
  private servicionURL = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
                      .set('api_key',this.apiKey)
                      .set('limit','20')
                      .set('q',query);

    this.http.get<SearchGIFResponse>(`${this.servicionURL}/search`,{params:params})
    .subscribe((resp )=> {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
  }
}
