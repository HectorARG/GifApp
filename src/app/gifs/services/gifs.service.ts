import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '78MFjj7ufJIPcn2xm2FGLn95DzdNDslK';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultado: Gif[] = [];

  get historial(): any{
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) ;
    }
    if (localStorage.getItem('resultados')) {
      this.resultado = JSON.parse(localStorage.getItem('resultados')!) ;
    }
  }

  buscarGifs( query: string ): void{

    query.trim().toUpperCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                   .set('api_key', this.apiKey)
                   .set('limit', '25')
                   .set('q', query)
                   .set('lang', 'es');

    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, {params})
    .subscribe( resp => {
      console.log(resp.data);
      this.resultado = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultado));
        });

  }

}
