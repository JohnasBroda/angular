import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentService } from '@services/payment.service';
import { Source } from '@shared/interfaces/stripe';

@Component({
  selector: 'app-user-sources',
  templateUrl: './user-sources.component.html',
  styleUrls: ['./user-sources.component.css']
})
export class UserSourcesComponent implements OnInit {

  public customer$: Observable<any>;

  @Input() public canSelect: boolean;
  @Output() public selectedSource = new EventEmitter<Source>();

  constructor(private paymentSvc: PaymentService) { }

  public ngOnInit() {
    this.customer$ = this.paymentSvc.getCustomer();
  }

  public clickHandler(source: Source) {
    this.selectedSource.emit(source);
  }
}
