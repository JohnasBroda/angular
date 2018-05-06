import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
  EventEmitter
} from '@angular/core';
import { PaymentService } from 'app/services/payment.service';
import { Charge, Source } from 'app/payment/models';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() totalAmount: number;

  @Output() stripeResult = new EventEmitter();

  public result: Charge | Source;

  @ViewChild('cardElement') cardElement: ElementRef;
  public card: any;
  public formError: string;
  public formComplete: boolean;
  public loading = false;

  constructor(private changeDetector: ChangeDetectorRef, public paymentSvc: PaymentService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.card = this.paymentSvc.elements.creater('card');
    this.card.mount(this.cardElement.nativeElement);

    // listen to change events on the card for validation errors
    this.card.on('change', (event) => {
      this.formError = event.error ? event.error.message : null;
      this.formComplete = event.complete;
      this.changeDetector.detectChanges();
    });
  }

  public formHandler() {
    this.loading = true;
    let action;

    if (this.totalAmount) {
      action = this.paymentSvc.createCharge(this.card, this.totalAmount);
    } else {
      action = this.paymentSvc.attachSource(this.card);
    }

    action.subscribe(
      data => {
        this.result = data;
        this.stripeResult.emit(data);
        this.loading = false;
      },
      error => {
        this.result = error;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.card.destroy();
  }
}
