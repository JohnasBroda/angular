import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from 'app/services/payment.service';
import { Source } from 'app/payment/models';

@Component({
  selector: 'app-user-sources',
  templateUrl: './user-sources.component.html',
  styleUrls: ['./user-sources.component.css']
})
export class UserSourcesComponent implements OnInit {

  public customer$: Observable<any>;

  @Input() canSelect: boolean;
  @Output() selectedSource = new EventEmitter<Source>();

  constructor(private paymentSvc: PaymentService) { }

  ngOnInit() {
    this.customer$ = this.paymentSvc.getCustomer();
  }

  public clickHandler(source: Source) {
    this.selectedSource.emit(source);
  }
}
