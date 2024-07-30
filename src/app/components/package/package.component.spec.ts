import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageComponent } from './package.component';
import { PackageService } from '../../services/package.service';
import { CommonModule } from '@angular/common';

describe('PackageComponent', () => {
  let component: PackageComponent;
  let fixture: ComponentFixture<PackageComponent>;
  let packageService: PackageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageComponent, CommonModule],
      providers: [PackageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageComponent);
    component = fixture.componentInstance;
    packageService = TestBed.inject(PackageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch packages on init', () => {
    spyOn(packageService, 'getPackages').and.callThrough();

    component.ngOnInit();

    expect(packageService.getPackages).toHaveBeenCalled();
    expect(component.packages.length).toBe(2);
  });
});
