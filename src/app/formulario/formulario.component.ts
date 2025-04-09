import { Component } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [
    FormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  nome = '';
  email = '';
  telefone = '';

  constructor(private contatoService: ContatoService,) { }

  adicionarContato() {
    if (this.nome && this.email && this.telefone) {
      this.contatoService.adicionarContato({
        nome: this.nome,
        email: this.email,
        telefone: this.telefone
      })
      this.nome = '';
      this.email = '';
      this.telefone = '';
    }
  }

}
