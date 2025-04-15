import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculaDto, PeliculaDtoIn } from '../interfaces/pelicula-dto';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private obtenerFormData(pelicula: PeliculaDtoIn): FormData {
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen!);
    formData.append('trailer', pelicula.trailer!);
    if (pelicula.fechaDeVista)
      formData.append('fechaDeVista', pelicula.fechaDeVista!);
    if (pelicula.poster) formData.append('poster', pelicula.poster);

    return formData;
  }
  agregar(pelicula: PeliculaDtoIn): Observable<any> {
    const formData = this.obtenerFormData(pelicula);
    return this.httpClient.post<any>(this.baseUrl, formData);
  }
  actualizar(peliculaId: number, pelicula: PeliculaDtoIn): Observable<any> {
    const formData = this.obtenerFormData(pelicula);
    return this.httpClient.put(this.baseUrl + peliculaId, formData);
  }
  obtenerPorId(id: string | null): Observable<PeliculaDto> {
    return this.httpClient.get<PeliculaDto>(this.baseUrl + id);
  }

  //baseUrl = 'http://localhost:3001/api/v1/peliculas/';
  //baseUrl = 'https://localhost:44322/api/v2/Peliculas/';
  baseUrl = 'https://utilidades.vmartinez84.xyz/api/v2/Peliculas/';
  constructor(private httpClient: HttpClient) {}

  obtenerTodo(): Observable<PeliculaDto[]> {
    return this.httpClient.get<PeliculaDto[]>(this.baseUrl);
  }
}
