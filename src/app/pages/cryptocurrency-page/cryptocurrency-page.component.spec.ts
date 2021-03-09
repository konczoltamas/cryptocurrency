import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyPageComponent } from './cryptocurrency-page.component';

describe('CryptocurrencyPageComponent', () => {
  let component: CryptocurrencyPageComponent;
  let fixture: ComponentFixture<CryptocurrencyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptocurrencyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
