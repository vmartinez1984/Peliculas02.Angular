import { Component } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { PeliculaDto } from '../../interfaces/pelicula-dto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-de-peliculas',
  imports: [],
  templateUrl: './lista-de-peliculas.component.html',
  styleUrl: './lista-de-peliculas.component.css',
})
export class ListaDePeliculasComponent {
  peliculas: PeliculaDto[] = [];
  peliculasSinVer: PeliculaDto[] = [];

  constructor(
    private servicio: PeliculaService,
    private sanitizer: DomSanitizer
  ) {
    this.obtenerTodo();
  }
  obtenerTodo() {
    this.servicio.obtenerTodo().subscribe({
      next: (peliculas) => {
        peliculas.forEach((item) => {
          item.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            item.trailer
          );
          item.poster = this.servicio.baseUrl + item.id + '/imagenes';
          if (item.fechaDeVista == null || item.fechaDeVista == '')
            this.peliculas.push(item);
          else this.peliculasSinVer.push(item);
        });
      },
      error: (errod) => {
        console.log(errod);
        alert('Valio pepino');
      },
    });
  }
}
