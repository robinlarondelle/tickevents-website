import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTicketService {
  private purchaseForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
    this.formBuilder.group({

    })
  )

  purchaseForm$: Observable<FormGroup> = this.purchaseForm.asObservable()

  constructor(
    private formBuilder: FormBuilder
  ) { }

  add
}
