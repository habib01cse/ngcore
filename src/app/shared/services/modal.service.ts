/* Angular Stuff */
import {
  ComponentFactoryResolver, Inject, Injectable, ReflectiveInjector,
  ViewContainerRef, ComponentRef, ComponentFactory, Component, Type,
} from '@angular/core';

/* 3rd party libraries */
import { Observable } from 'rxjs';

import {
  DateService,
} from "src/app/shared";

/* our own stuff */

import { fixedValues } from '../constants/fixed-values.enum';
import { DocumentListComponent } from 'src/app/features/ac/components/forms/modals/document-list.component';
import { VoucherDtl } from 'src/app/features/ac/models/voucher.model';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ModalService {
  openDialog(arg0: string, arg1: string, arg2: { title: string; data: { userPrivilege: any; }; settings: { modalClass: string; }; }) {
    throw new Error("Method not implemented.");
  }
  private container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  // factoryResolver:ComponentFactoryResolver;
  rootViewContainer: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private dateUtil: DateService,
    ) { }


  /**
   * Creates a new Modal and displays your ModalComponent within the modal.
   * 
   * @param container   the ViewChild container (within your formComponent for e.g.).
   * @param modalComponent    the Component to load inside the modal i.e. the ModalComponent.
   * @param willContainChildModal   true if modal has child modal.
   * @param optionalParam   any optional param to be assigned to the ModalComponent. The ModalComponent must declare an optionalParam property (with the Input decorator) if this parameter is to be provided. See 'user-list.component.ts' for example.
   * 
   * @returns an Observable object wrapping the submit event. 
   * Subscribe to this Observable to access the value emitted by your ModalComponent on submit
   * (e.g. user clicked / selected row from your ModalComponent list).
   * 
   * NOTE: the ModalComponent needs to emit _item on itemClick(_item) through this.submit.next(_item). The need for this.dataObj is therefore unnecessary.
   * 
   * Visit the 'Hr1054Component', 'EmployeeListComponent' or 'NewHrRequisitionLetterComponent' to learn how to implement this method.
   * 
   */
  createNewModal(container: ViewContainerRef, modalComponent: Type<any>, willContainChildModal: boolean = false, optionalParam?: any): Observable<any> {
    this.container = container;
    this.container.clear();

    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(modalComponent);
    this.componentRef = this.container.createComponent(factory);

    if (willContainChildModal) {
      this.componentRef.instance.modal = this;
    }
    this.componentRef.instance.optionalParam = optionalParam;
    this.componentRef.instance.modalShow = true;

    return this.componentRef.instance.submit.asObservable();
  }

  /**
   * Utility method to clear the modal's current View Container.
   */
  clearViewContainer() {
    this.container.clear();
  }

  /**
   * Utility method to show current reference of modalComponent instance.
   */
  showModal() {
    if (this.componentRef.instance) {
      this.componentRef.instance.modalShow = true;
    }
  }

  /**
   * Utility method to hide current reference of modalComponent instance.
   */
  hideModal() {
    if (this.componentRef.instance) {
      this.componentRef.instance.modalShow = false;
    }
  }


  getExchangRate(_curNo: any, _currencyList: any) {
    return parseFloat(_currencyList.filter(x => x.CUR_NO === (parseInt)(_curNo)).map(x => x.EXCHANGE_RATE));
  }

  createDocumentListComponent(container, obj, compt) {
    this.container = container;    
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DocumentListComponent);
    this.componentRef = this.container.createComponent(factory);    
    this.componentRef.instance.modalShow = true;
    console.log('this.componentRef.instance', this.componentRef.instance);
    this.componentRef.instance.submit.subscribe(
      event => {
        const dataObj = this.componentRef.instance.dataObj;
        if (Object.keys(dataObj).length > 0) {
          obj.ACC_NO = dataObj.ACC_NO;
          obj.BANK_REF_NO = dataObj.BANK_REF_NO;
          obj.SALESCONTRACT_NO = dataObj.CONTRACT_NO;
          obj.COST_NAME = dataObj.COST_NAME;
          obj.COST_NO = dataObj.COST_NO;
          obj.CURRENCY = dataObj.CURRENCY;
          obj.NEG_CURRENCY_NO = dataObj.CURRENCY_NO;
          obj.CUSTOMER_NAME = dataObj.CUSTOMER_NAME;
          obj.CUSTOMER_NO = dataObj.CUSTOMER_NO;
          obj.DOC_AMENDMENT = dataObj.DOC_AMENDMENT;
          obj.NEG_EXCHANGE_RATE = dataObj.EXCHANGE_RATE;
          obj.OWN_BANKDTL = dataObj.OWN_BANKDTL;
          obj.OWN_BANKDTL_NO = dataObj.OWN_BANKDTL_NO;
        }

        console.log('check ! sublimt');
        compt.getSlCustomer(dataObj.CUSTOMER_NO);
        compt.getSalesDocs(dataObj.CONTRACT_NO, dataObj.BANK_REF_NO);
        //compt.getCurrencyAssingForDtl(obj);

      }
    );

  }
  openComponent(container, obj) {
    // this.createComponent(container, obj);
  }

  

 

}
