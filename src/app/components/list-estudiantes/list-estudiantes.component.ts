import { Component ,OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { Estudiante } from '../../interfaces/estudiante';
import { UsuarioService } from '../../services/consultas.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Progressbar } from '../../shared/progress-bar/progress-bar.component';


@Component({
  selector: 'app-list-estudiantes',
  standalone: true,
  imports: [NavbarComponent,SliderComponent ,CommonModule,RouterLink,Progressbar],
  templateUrl: './list-estudiantes.component.html',
  styleUrl: './list-estudiantes.component.css'
})
export class ListEstudiantesComponent implements OnInit{
  listEstudiante: Estudiante[] = []
  loading: boolean = false;

  constructor(private UsuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListEstudiante();
  }

  getListEstudiante() {
    this.loading = true;
    this.UsuarioService.getListEstudiante().subscribe((data: Estudiante[]) => {
      this.listEstudiante = data;
      this.loading = false;
      console.log(this.listEstudiante)
    })
  
   
  }
  deleteEstudiante(id: number) {
    this.loading = true;
    this.UsuarioService.deleteEstudiante(id).subscribe(() => {
      this.getListEstudiante();
      this.toastr.warning('El ALUMNO fue eliminado con exito', ' eliminado');
    })
  }
  updateEstudiante(id: number, studiant: Estudiante) {
    this.loading = true;
    this.UsuarioService.updateEstudiante(id, studiant).subscribe(() => {
      this.getListEstudiante();
      this.toastr.success('El ALUMNO fue actualizado con éxito', 'Actualizado');
    }, error => {
      this.loading = false;
      this.toastr.error('Ocurrió un error al actualizar el alumno', 'Error');
    });
  }
  postEstudiante( estudent: Estudiante) {
    this.loading = true;
    this.UsuarioService.postEstudiante( estudent).subscribe(() => {
      this.getListEstudiante();
      this.toastr.success('El ALUMNO fue agregado con éxito', 'Agregado');
    }, error => {
      this.loading = false;
      this.toastr.error('Ocurrió un error al agregar el alumno', 'Error');
    });
  }
  
}
