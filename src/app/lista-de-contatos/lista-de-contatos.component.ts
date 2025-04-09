import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato/contato.component';
import {NgForOf} from '@angular/common';
import { ContatoService } from '../service/contato.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-lista-de-contatos',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './lista-de-contatos.component.html',
  styleUrl: './lista-de-contatos.component.css'
})
export class ListaDeContatosComponent {
  contatos: Contato[] = [];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatos = this.contatoService.getContatos();
  }

  removeContato(id: number) {
    this.contatoService.removerContato(id);
    this.carregarContatos();
  }

}
