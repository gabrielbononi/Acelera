import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CepService } from './cep.service';
import { HttpErrorResponse } from '@angular/common/http';


interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const dummyCepResponse: CepResponse = {
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

describe('CepService', () => {
  let service: CepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CepService,
        provideHttpClient(), 
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(CepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch CEP data successfully', () => {
    service.getCepData('15990253').subscribe(data => {
      expect(data).toEqual(dummyCepResponse);
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/15990253/json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCepResponse);
  });

  it('should handle network error', () => {
    service.getCepData('15990253').subscribe({
      next: () => fail('should have failed with a network error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(0); 
        expect(error.message).toBe('Http failure response for https://viacep.com.br/ws/15990253/json: 0 '); 
      }
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/15990253/json');
    req.error(new ProgressEvent('Network error'), { status: 0 }); 
  });
});
