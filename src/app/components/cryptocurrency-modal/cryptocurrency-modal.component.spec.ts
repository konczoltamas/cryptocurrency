import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyModalComponent } from './cryptocurrency-modal.component';

describe('CryptocurrencyModalComponent', () => {
  let component: CryptocurrencyModalComponent;
  let fixture: ComponentFixture<CryptocurrencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptocurrencyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
