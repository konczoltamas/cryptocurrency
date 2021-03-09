import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSetComponent } from './tab-set.component';

describe('CurrencyViewerComponent', () => {
  let component: TabSetComponent;
  let fixture: ComponentFixture<TabSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
