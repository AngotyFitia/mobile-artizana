import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsProduitPage } from './details-produit.page';

describe('DetailsProduitPage', () => {
  let component: DetailsProduitPage;
  let fixture: ComponentFixture<DetailsProduitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
