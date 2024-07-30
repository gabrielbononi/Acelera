import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-cep-search',
  standalone: true,
  templateUrl: './cep-search.component.html',
  styleUrls: ['./cep-search.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class CepSearchComponent {
  cep = '';
  address: any;
  errorMessage: string | null = null;
  searchHistory: string[] = [];

  constructor(private cepService: CepService) { }

  onSearch() {
    this.cepService.getCepData(this.cep).subscribe(
      data => {
        this.address = data;
        this.errorMessage = null;
        this.updateSearchHistory(this.cep);
      },
      error => {
        this.address = null;
        this.errorMessage = 'CEP não encontrado!';
      }
    );
  }

  updateSearchHistory(cep: string) {
    if (!this.searchHistory.includes(cep)) {
      this.searchHistory.push(cep);
    }
  }
}
