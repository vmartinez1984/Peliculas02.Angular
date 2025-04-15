import { SafeResourceUrl } from '@angular/platform-browser';

export interface PeliculaDto {
  id: number;
  titulo: string;
  resumen: string;
  trailer: string;
  fechaDeVista: string | null;
  fechaDeRegistro: Date;
  videoUrl?: SafeResourceUrl;
  poster: string;
  marcardaComoVista: boolean;
}

export interface PeliculaDtoIn {
  titulo: string;
  resumen: string;
  trailer?: string;
  poster?: File | null;
  fechaDeVista?: string | null

}
