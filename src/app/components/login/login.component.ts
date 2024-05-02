import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from '../../shared/spiner/spiner.component';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/consultas.service';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { Usuario2 } from '../../interfaces/usuariologin';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,SpinerComponent,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre_usuario : string='';
  contrasena : string='';
  confiContrasena : string='';
  id_tipo_usuario:number=1;
  loading:boolean=false;
  
  constructor(private toastr:ToastrService, private _usuarioService:UsuarioService, private router : Router,private _errorService : ErrorService){}

  addUser(){
    // validar usuario

    if (this.nombre_usuario == '' || this.contrasena == '' || this.confiContrasena == '') {
      this.toastr.error('Todos los campos son obligatorios','Error');
      return;
    }

   // validamos que la contraseña sean iguales

    if (this.contrasena != this.confiContrasena) {
      this.toastr.error('Las Contraseñas no Coinciden','Error');
      return;
    }

    // creamos el objeto 

    const usuario : Usuario = {
      nombre_usuario : this.nombre_usuario,
      contrasena : this.contrasena,
      id_tipo_usuario:this.id_tipo_usuario
    }

    this.loading=true;
    this._usuarioService.signIn(usuario).subscribe({
      next:(v)=>{
        this.loading=false;
      this.toastr.success('El Usuario fue registrado con exito','Usuario Registrado');
      this.router.navigate(['/login1'])
      this.reset();
      },
      error:(e:HttpErrorResponse)=>{
        this.loading=false;
       this._errorService.msgError(e);
       this.reset();

      },
      complete:()=>console.info('complete')
    })

  }

  reset(){
    this.nombre_usuario='';
    this.contrasena='';
    this.confiContrasena='';
  }


  login(){

    // validar usuario
  
    if (this.nombre_usuario == '' || this.contrasena == '') {
      this.toastr.error('Todos los campos son obligatorios','Error');
      return;
    }
  
  
    //creamos el body
    const usuario : Usuario2 = {
      nombre_usuario : this.nombre_usuario,
      contrasena : this.contrasena,
    }
    this.loading=true;
    this._usuarioService.loign(usuario).subscribe({
      next:(token)=>{
      this.router.navigate(['/dashboard'])
      localStorage.setItem('token',token)
      
      },
      error:(e:HttpErrorResponse)=>{
        this.loading=false;
        this._errorService.msgError(e);
      },
    })
  
    
   }

}


