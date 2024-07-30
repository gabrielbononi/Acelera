import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CepSearchComponent } from './components/cep-search/cep-search.component';
import { UserComponent } from './components/user/user.component';
import { PackageComponent } from './components/package/package.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, CepSearchComponent, UserComponent, PackageComponent]
})
export class AppComponent {
  title = 'Gerenciamento de Entregas';
}
