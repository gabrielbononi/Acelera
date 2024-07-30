import { Injectable } from '@angular/core';

export interface Package {
  id: number;
  description: string;
  weight: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: Package[] = [
    { id: 1, description: 'Package 1', weight: '2kg', status: 'Pending' },
    { id: 2, description: 'Package 2', weight: '5kg', status: 'Delivered' }
  ];

  getPackages(): Package[] {
    return this.packages;
  }
}
