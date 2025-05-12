import { Component } from '@angular/core';
import {Grupo} from '../model/grupo';
import {GrupoService} from '../service/grupo.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-grupo',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  grupos: Grupo[] = [];
  nome: string = '';
  editandoId: number | null = null;

  constructor(private grupoService: GrupoService) {  }

  listar() {
    this.grupoService.findAll().subscribe(grupos => this.grupos = grupos);
  }

  salva() {
    if (this.editandoId) {
      this.grupoService.updateGrupo(this.editandoId, { nome: this.nome }).subscribe(() => {
        this.resetar();
        this.listar();
      });
    } else {
      this.grupoService.save({ nome: this.nome }).subscribe(() => {
        this.resetar();
        this.listar();
      })
    }
  }

  editar(grupo: Grupo) {
    this.editandoId = grupo.id!;
    this.nome = grupo.nome ?? '';
  }

  excluir(id: number) {
    this.grupoService.deleteGrupo(id).subscribe(() => this.listar());
  }

  resetar() {
    this.nome = '';
    this.editandoId = null;
  }

}
