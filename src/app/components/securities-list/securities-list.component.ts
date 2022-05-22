import { Component, OnInit } from '@angular/core';
import { Security } from '../../models/security';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { indicate } from '../../utils';
import { SecurityService } from '../../services/security.service';
import { FilterBarService } from '../filter-bar/filter-bar.service';
import {
  SecuritiesFilter,
  SecuritiesTypesAndCurrencies,
} from '../../models/securitiesFilter';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss'],
  providers: [FilterBarService],
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'type', 'currency'];

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private securityService: SecurityService,
    private filterBarService: FilterBarService<SecuritiesFilter>
  ) {}

  ngOnInit(): void {
    //Server should send the types and currencies available
    this.securityService
      .getSecuritiesTypesAndCurrencies()
      .subscribe((filterBarSelectionData: SecuritiesTypesAndCurrencies) => {
        //Setting of filters that should be shown
        this.filterBarService.setFilterBarSettingsData({
          name: '',
          currencies: filterBarSelectionData.currencies,
          types: filterBarSelectionData.types,
          //isPrivate: true,
        });
      });

    this.filterBarService
      .filterBarSelectionAsObservable()
      .pipe(debounceTime(200))
      .subscribe((securitiesFilter: SecuritiesFilter) => {
        this.loadSecurities(securitiesFilter);
      });
    this.loadSecurities({});
  }

  private loadSecurities(securitiesFilter: SecuritiesFilter): void {
    this.securities$ = this.securityService
      .getSecurities(securitiesFilter)
      .pipe(indicate(this.loadingSecurities$));
  }
}
