import { Routes } from '@angular/router';
import { ListaDeContatosComponent } from './lista-de-contatos/lista-de-contatos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ContatoComponent } from './contato/contato.component';
import {GrupoComponent} from './grupo/grupo.component';

export const routes: Routes = [
  {path: 'lista', component: ListaDeContatosComponent },
  {path: 'formulario', component: FormularioComponent },
  {path: 'detalhes/:id', component: ContatoComponent},
  {path: '', redirectTo: 'formulario', pathMatch: 'full'},
  {path: 'grupo', component: GrupoComponent },
];
