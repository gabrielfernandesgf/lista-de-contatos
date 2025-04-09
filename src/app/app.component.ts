import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { Contato  } from './contato/contato.component';
import {FormularioComponent} from './formulario/formulario.component';
import {ListaDeContatosComponent} from './lista-de-contatos/lista-de-contatos.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FormularioComponent, ListaDeContatosComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contatos: Contato[] = [];
}
