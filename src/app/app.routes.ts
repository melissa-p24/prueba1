import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';
import { AddEditEstudianteComponent } from './components/add-edit-estudiante/add-edit-estudiante.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login1' , pathMatch: 'full' },


    { path: 'login1', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tabla', component:  ListEstudiantesComponent},
    { path: 'list-estuden', component:  ListEstudiantesComponent},
    {path:'add', component:AddEditEstudianteComponent},
    {path:'edit/:id', component:AddEditEstudianteComponent},
   
    
];
