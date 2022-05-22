import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterBarService } from '../filter-bar/filter-bar.service';
import { SecuritiesFilter } from '../../models/securitiesFilter';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-securities-filter-bar',
  templateUrl: './securities-filter-bar.component.html',
  styleUrls: ['./securities-filter-bar.component.scss'],
})
export class SecuritiesFilterBarComponent implements OnInit {
  public filterForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public filterBarService: FilterBarService<SecuritiesFilter>
  ) {}

  ngOnInit(): void {
    this.filterBarService
      .filterBarSettingsDataAsObservable()
      .pipe(filter((securitiesFilter: SecuritiesFilter) => !!securitiesFilter))
      .subscribe((securitiesFilterSettingsData: SecuritiesFilter) => {
        this.setFilterFormControls(securitiesFilterSettingsData);
      });
  }

  private setFilterFormControls(
    securitiesFilterSettingsData: SecuritiesFilter
  ): void {
    this.filterForm = this.formBuilder.group({});
    if (securitiesFilterSettingsData.hasOwnProperty('name')) {
      this.filterForm.addControl('name', this.formBuilder.control(''));
    }
    if (securitiesFilterSettingsData.types?.length) {
      this.filterForm.addControl('types', this.formBuilder.control([]));
    }
    if (securitiesFilterSettingsData.currencies?.length) {
      this.filterForm.addControl('currencies', this.formBuilder.control([]));
    }
    if (securitiesFilterSettingsData.isPrivate !== undefined) {
      this.filterForm.addControl(
        'isPrivate',
        this.formBuilder.control(securitiesFilterSettingsData.isPrivate)
      );
    }
    this.onChanges();
  }

  private onChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        map((valuesInGroup: SecuritiesFilter) => {
          return <SecuritiesFilter>{
            name: valuesInGroup.name,
            types:
              valuesInGroup.types?.length > 0 ? valuesInGroup.types : undefined,
            currencies:
              valuesInGroup.currencies?.length > 0
                ? valuesInGroup.currencies
                : undefined,
            isPrivate: valuesInGroup.isPrivate ?? undefined,
          };
        })
      )
      .subscribe((value) => {
        this.filterBarService.setFilterBarSelection(value);
      });
  }
}
