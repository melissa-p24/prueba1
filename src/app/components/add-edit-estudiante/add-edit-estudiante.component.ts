import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/consultas.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces/estudiante';
import { Progressbar } from '../../shared/progress-bar/progress-bar.component';



@Component({
  selector: 'app-add-edit-estudiante',
  standalone: true,
  imports: [Progressbar,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink


  ],
  templateUrl: './add-edit-estudiante.component.html',
  styleUrl: './add-edit-estudiante.component.css'
})
export class AddEditEstudianteComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';
  constructor(private fb: FormBuilder,
    private _UsuarioServicio: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      num_cel: ['', Validators.required],
      email: ['', Validators.required],
      DNI: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // editar
      this.operacion = 'editar';
      this.getEstudiante(this.id);
    }
  }
  getEstudiante(id: number) {
    this.loading = true;
    this._UsuarioServicio.getEstudiante(id).subscribe((data: Estudiante) => {
      this.loading = false;
      this.form.setValue({
        Nombres: data.Nombres,
        Apellidos: data.Apellidos,
        num_cel: data.num_cel,
        email: data.email,
        DNI: data.DNI
      })
    })

  }
  
  
  

  ruta() {
    const estudiante: Estudiante = {
      Nombres: this.form.value.Nombres,
      Apellidos: this.form.value.Apellidos,
      num_cel: this.form.value.num_cel,
      email: this.form.value.email,
      DNI: this.form.value.DNI
    };
  
    this.loading = true;
  
    if (this.id !== 0) {
      estudiante.id = this.id;
      this._UsuarioServicio.updateEstudiante(this.id, estudiante).subscribe(() => {
        console.log('¡Hola!'); // Agregado para verificar si el flujo alcanza este punto
        this.toastr.info(`El estudiante ${estudiante.Nombres} fue actualizado con éxito`, 'Estudiante actualizado');
        this.loading = false;
        this.router.navigate(['/tabla']);
      });
    } else {
      this.loading = false;
      this.router.navigate(['/list-estuden']);
    }
  
  }
} 
