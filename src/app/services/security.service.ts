import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Security } from '../models/security';
import { SECURITIES } from '../mocks/securities-mock';
import {
  SecuritiesFilter,
  SecuritiesTypesAndCurrencies,
} from '../models/securitiesFilter';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor() {}

  /**
   * Get Securities server request mock
   * */
  getSecurities(securityFilter?: SecuritiesFilter): Observable<Security[]> {
    const filteredSecurities = this.filterSecurities(securityFilter).slice(
      securityFilter?.skip ?? 0,
      securityFilter?.limit ?? 100
    );

    return of(filteredSecurities).pipe(delay(1000));
  }

  private filterSecurities(securityFilter: SecuritiesFilter) {
    if (!securityFilter) return SECURITIES;

    return SECURITIES.filter(
      (s) =>
        (!securityFilter.name || s.name.includes(securityFilter.name)) &&
        (!securityFilter.types ||
          securityFilter.types.some((type) => s.type === type)) &&
        (!securityFilter.currencies ||
          securityFilter.currencies.some(
            (currency) => s.currency == currency
          )) &&
        (securityFilter.isPrivate === undefined ||
          securityFilter.isPrivate === s.isPrivate)
    );
  }

  /**
   * Get available Securities Types and Currencies
   * ONLY AS EXAMPLE - THOSE SHOULD COME FROM SERVER :)
   */
  getSecuritiesTypesAndCurrencies(): Observable<SecuritiesTypesAndCurrencies> {
    return of({
      types: [
        'Equity',
        'Closed-endFund',
        'BankAccount',
        'DirectHolding',
        'Generic',
        'Collectible',
        'Loan',
        'RealEstate',
      ].sort((a, b) => a.localeCompare(b)),
      currencies: ['USD', 'EUR', 'GBP'].sort((a, b) => a.localeCompare(b)),
    });
  }
}
