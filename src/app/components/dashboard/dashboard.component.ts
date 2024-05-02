import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,SliderComponent,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  

}

