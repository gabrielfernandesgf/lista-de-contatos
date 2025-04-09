import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ContatoService} from '../service/contato.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contato',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  contato: Contato | undefined;

  constructor(
    private contatoService: ContatoService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.contato = this.contatoService.getContatoId(id);
  }

}

export interface Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}
