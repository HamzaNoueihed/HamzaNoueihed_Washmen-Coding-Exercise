import { Component, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';


@Component({
  selector: 'cm-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  customers: ICustomer[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 30;
  _filteredCustomers: ICustomer[] = [];

  get filteredCustomers() {
    return this._filteredCustomers;
  }

  set filteredCustomers(value: ICustomer[]) {
    this._filteredCustomers = value;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = DisplayModeEnum.Card;

    this.getCustomersPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getCustomersPage(page);
  }

  getCustomersPage(page: number) {
    this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<ICustomer[]>) => {
          this.customers = this.filteredCustomers = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.customers) {
        const props = ['distance'];
        this.filteredCustomers = this.filterService.filter<ICustomer>(this.customers, data, props);
    } else {
      this.filteredCustomers = this.customers;
    }
  }

}

enum DisplayModeEnum {
  Card = 0
}
