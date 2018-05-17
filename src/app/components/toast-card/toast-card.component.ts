import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-card',
  templateUrl: './toast-card.component.html',
  styleUrls: ['./toast-card.component.css']
})
export class ToastCardComponent implements OnInit {

  public message;

  constructor() { }

  ngOnInit() {
  }

  public dismiss() {

  }
}
