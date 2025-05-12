import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {ContatoService} from '../service/contato.service';
import {Contato} from '../model/contato';
import {CommonModule, NgIf} from '@angular/common';
import {GrupoService} from '../service/grupo.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  contato: Contato | null = null;

  constructor(
    private service: ContatoService,
    private serviceGrupo: GrupoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.findById(+id).subscribe(res => this.contato = res);
      }
    });
  }

  voltar() {
    this.router.navigateByUrl('/lista')
  }

  adicionarGrupo() {
    const nomeGrupo = prompt('Digite o nome do Grupo:');

    if (nomeGrupo && this.contato?.id) {
      this.serviceGrupo.criarOuBuscarGrupo(nomeGrupo).subscribe((grupo) => {
          this.service.vincularGrupo(this.contato!.id!, grupo.id!).subscribe(() => {
            this.service.findById(this.contato!.id!).subscribe((c: Contato) => {
              this.contato = c;
            });

            this.serviceGrupo.findAll().subscribe(grupos => {
              this.serviceGrupo.atualizarGrupos(grupos);
            });
          });
      });
    }
  }


}

