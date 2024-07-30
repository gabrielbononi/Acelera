import { TestBed } from '@angular/core/testing';
import { PackageService } from './package.service';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return packages', () => {
    const packages = service.getPackages();
    expect(packages.length).toBe(2);
    expect(packages[0].description).toBe('Package 1');
    expect(packages[1].description).toBe('Package 2');
  });
});
