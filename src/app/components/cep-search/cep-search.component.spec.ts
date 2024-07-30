import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { CepSearchComponent } from './cep-search.component';
import { CepService } from '../../services/cep.service';

describe('CepSearchComponent', () => {
  let component: CepSearchComponent;
  let fixture: ComponentFixture<CepSearchComponent>;
  let cepService: CepService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepSearchComponent, FormsModule, HttpClientModule], 
      providers: [CepService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepSearchComponent);
    component = fixture.componentInstance;
    cepService = TestBed.inject(CepService);
    fixture.detectChanges();
  });

  const dummyCepResponse = {
    cep: "15990-253",
    logradouro: "Avenida Yolanda Tomazelli Cecchetto",
    complemento: "",
    bairro: "Residencial Beniamino Cadioli",
    localidade: "Matão",
    uf: "SP",
    ibge: "3529302",
    gia: "4418",
    ddd: "16",
    siafi: "6687"
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch address on search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();

    expect(component.address).toEqual(dummyCepResponse);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error on search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(throwError(()=>'CEP não encontrado!'));

    component.cep = '15990253';
    component.onSearch();

    expect(component.address).toBeNull();
    expect(component.errorMessage).toBe('CEP não encontrado!');
  });

  it('should update search history on successful search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();

    expect(component.searchHistory).toContain('15990253');
  });

  it('should not duplicate entries in search history', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();
    component.onSearch();

    expect(component.searchHistory.length).toBe(1);
    expect(component.searchHistory).toContain('15990253');
  });
});
