import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Usuario2 } from '../interfaces/usuariologin';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	private myAppUrl:string;
	private myApiUrl:string;
	constructor( private http:HttpClient ) {
		this.myAppUrl = environment.endpoint;
		this.myApiUrl = 'api' ;
	 }

	 signIn(usuario : Usuario):Observable<any>{

		return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/loginC`,usuario)

	 }

	 loign(usuario : Usuario2): Observable<string>{
		 return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/loginA`,usuario)
	 }
	
	 getListEstudiante(): Observable<Estudiante[]>{
		 return this.http.get<Estudiante[]>(`${this.myAppUrl}${this.myApiUrl}/estudiantes`);
	 }
	 deleteEstudiante(id:number): Observable<void>{
		 return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/estudiantes/${id}`);
	 }
	 postEstudiante(estudent: Estudiante): Observable<void> {
		return this.http.post<void>(`${this.myAppUrl}`,estudent)
	}
	 getEstudiante(id: number): Observable<Estudiante> {
		return this.http.get<Estudiante>(`${this.myAppUrl}${this.myApiUrl}/estudiantes/${id}`);
	}
	updateEstudiante(id: number, estudent: Estudiante): Observable<void> {
		return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/estudiantes/${id}`, estudent);
	}

}
