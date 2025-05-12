import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { NgForOf } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Contato } from '../model/contato';

@Component({
  selector: 'app-lista-de-contatos',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './lista-de-contatos.component.html',
  styleUrl: './lista-de-contatos.component.css'
})
export class ListaDeContatosComponent {

  contatos: Contato[] = [];

  constructor(private service: ContatoService, private router: Router) {
    this.service.findAll().subscribe(contatos => this.contatos = contatos);
  }

  detalhe(id: number | undefined) {
    if (id != null) {
      this.router.navigateByUrl(`detalhes/${id}`);
    } else {
      alert('ID inválido');
    }

    // /lista-de-contatos/${id}
  }

  novoContato(){
    this.router.navigateByUrl('/formulario');
  }
}

