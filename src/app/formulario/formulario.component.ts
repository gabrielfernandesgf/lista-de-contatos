import {Component, OnDestroy, OnInit} from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { GrupoService } from '../service/grupo.service';
import { Grupo } from '../model/grupo';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {NgForOf, NgIf, CommonModule} from '@angular/common';
import {Contato} from '../model/contato';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgForOf,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit, OnDestroy {

  nome: string = '';
  email: string = '';
  telefone: string = '';

  criandoGrupo: boolean = false;
  nomeNovoGrupo: string = '';
  favorito: boolean = false;


  grupos: Grupo[] = [];
  grupoId: number | null = null;

  constructor(
    private service: ContatoService,
    private grupoService: GrupoService,
    private router: Router
  ) {
    this.grupoService.findAll().subscribe(grupos => {
      this.grupos = grupos;
    })
  }

  ngOnInit(): void {
    this.grupoService.grupos$.subscribe(grupos => this.grupos = grupos);
  }

  adiciona(): void {
    if (!this.nome.trim() || !this.email.trim() || !this.telefone.trim()) {
      alert('Preencha todos os campos obrigatorios.');
      return;
    }

    const contato: Contato = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      favorito: this.favorito,
      grupos: this.grupoId ? [{ grupo: { id: this.grupoId}  }] : []
    };

    this.service.save(contato).subscribe(res => {
      console.log(res);
      alert("Contato adicionado com sucesso!");
      this.router.navigateByUrl('/lista');
    });


  }

  voltar() {
    this.router.navigateByUrl('/lista')
  }

  ngOnDestroy(): void {
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.grupoId = null;
  }

  toggleCriarGrupo() {
    this.criandoGrupo = true;
  }

  cancelarGrupo() {
    this.criandoGrupo = false;
    this.nomeNovoGrupo = '';
  }

  criarGrupo() {
    if (this.nomeNovoGrupo.trim()) {
      this.grupoService.save({ nome: this.nomeNovoGrupo }).subscribe(grupoCriado => {
        this.grupos.push(grupoCriado);
        this.grupoId = grupoCriado.id ?? null;
        this.nomeNovoGrupo = '';
        this.criandoGrupo = false;
      });
    }
  }


}
