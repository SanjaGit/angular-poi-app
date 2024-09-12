import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiFetcherComponent } from './poi-fetcher.component';

describe('PoiFetcherComponent', () => {
  let component: PoiFetcherComponent;
  let fixture: ComponentFixture<PoiFetcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoiFetcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoiFetcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
