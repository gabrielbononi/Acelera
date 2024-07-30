import { Component, OnInit } from '@angular/core';
import { PackageService, Package } from '../../services/package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package',
  standalone: true,
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  imports: [CommonModule]
})
export class PackageComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packages = this.packageService.getPackages();
  }
}
