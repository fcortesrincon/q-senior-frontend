import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesFilterBarComponent } from './securities-filter-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBarService } from '../filter-bar/filter-bar.service';
import { SecuritiesFilter } from '../../models/securitiesFilter';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SecuritiesFilterBarComponent', () => {
  let component: SecuritiesFilterBarComponent;
  let fixture: ComponentFixture<SecuritiesFilterBarComponent>;
  let filterBarService: FilterBarService<SecuritiesFilter> =
    new FilterBarService<SecuritiesFilter>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
      ],
      declarations: [SecuritiesFilterBarComponent],
      providers: [FilterBarService],
    }).compileComponents();
    filterBarService = TestBed.inject(FilterBarService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritiesFilterBarComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show desired filter inputs', async () => {
    filterBarService.setFilterBarSettingsData({
      name: '',
      types: ['Type 1', 'Type 2'],
    });
    fixture.detectChanges();
    const formElement = fixture.debugElement.nativeElement.querySelector(
      '#securitiesFilterBarForm'
    );
    expect(formElement).toBeDefined();
    const nameInput = formElement.querySelector('#nameInput');
    expect(nameInput).toBeDefined();
    const isPrivate = formElement.querySelector('#isPrivate');
    expect(isPrivate).toBeNull();
  });

  it('should send filter changes', async () => {
    filterBarService.setFilterBarSettingsData({
      name: '',
      types: ['Type 1', 'Type 2'],
    });
    spyOn(filterBarService, 'setFilterBarSelection');
    fixture.detectChanges();
    const nameControl = component.filterForm.get('name');
    const dummyValue = 'Test';
    nameControl?.setValue(dummyValue);
    fixture.detectChanges();
    expect(filterBarService.setFilterBarSelection).toHaveBeenCalled();
  });
});
