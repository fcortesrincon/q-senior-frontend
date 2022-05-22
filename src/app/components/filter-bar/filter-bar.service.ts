import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FilterBarService<T> {
  private filterBarSettingsData$: BehaviorSubject<T | null> =
    new BehaviorSubject<T | null>(null);
  private filterBarSelection$: BehaviorSubject<T | null> =
    new BehaviorSubject<T | null>(null);

  constructor() {}

  filterBarSelectionAsObservable(): Observable<T> {
    return this.filterBarSelection$.asObservable();
  }

  filterBarSettingsDataAsObservable(): Observable<T> {
    return this.filterBarSettingsData$.asObservable();
  }

  setFilterBarSelection(filterBarSelection: T | null): void {
    this.filterBarSelection$.next(filterBarSelection);
  }

  setFilterBarSettingsData(filterBarData: T | null): void {
    this.filterBarSettingsData$.next(filterBarData);
  }
}
