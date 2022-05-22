import { Component, SkipSelf } from '@angular/core';
import { FilterBarService } from './filter-bar.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  viewProviders: [FilterBarService],
})
export class FilterBarComponent<T> {
  constructor(@SkipSelf() public filterBarService: FilterBarService<T>) {}
}
