import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocketsComponent } from './footer-sockets.component';

describe('FooterSocketsComponent', () => {
  let component: FooterSocketsComponent;
  let fixture: ComponentFixture<FooterSocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSocketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
