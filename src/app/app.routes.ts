import { Routes, RouterModule } from '@angular/router';
import { ListaDeContatosComponent } from './lista-de-contatos/lista-de-contatos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ContatoComponent } from './contato/contato.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {path: '', component: ListaDeContatosComponent },
  {path: 'adicionar', component: FormularioComponent },
  {path: 'detalhes/:id', component: ContatoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
