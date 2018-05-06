import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


export class Toast {
  content: string;
  style: string;
  id: number;
  type: string;
  dismissed: boolean;

  constructor(content, id, type, style?) {
    this.content = content;
    this.style = style || 'primary';
    this.type = this.style === 'primary' ? 'important' : this.style;
  }
}

export interface ToasterOptions {
  duration: number;
  style: string;
  dismissible: boolean;
  animations?: {
    enter: string;
    leave: string;
  };
}

@Injectable()
export class ToastService {

  private options: ToasterOptions = {
    duration: 3000,
    style: 'primary',
    dismissible: true,
    animations: {
      enter: 'fadeIn',
      leave: 'fadeOut'
    }
  };
  public messages: Message[] = [];

  constructor() { }

  public showSuccess(detail?: string) {
    this.messages = [];
    const msgs = [{ severity: 'success', summary: 'Success Message', detail: detail || 'Order submitted' }];
    this.messages = [...msgs];
  }

  public showInfo(detail?: string) {
    this.messages = [];
    const msgs = [{ severity: 'info', summary: 'Info Message', detail: detail || 'PrimeNG rocks' }];
    this.messages = [...msgs];
  }

  public showWarn(detail?: string) {
    this.messages = [];
    const msgs = [{ severity: 'warn', summary: 'Warn Message', detail: detail || 'There are unsaved changes' }];
    this.messages = [...msgs];
  }

  public showError(detail?: string) {
    this.messages = [];
    const msgs = [{ severity: 'error', summary: 'Error Message', detail: detail || 'Validation failed' }];
    this.messages = [...msgs];
  }

  public clear() {
    this.messages = [];
}

}
