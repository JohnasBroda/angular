import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../../services/fire-auth-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private authSvc: FireAuthService) { }

  ngOnInit() {
  }
}
