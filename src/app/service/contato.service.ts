import { Injectable } from '@angular/core';
import { Contato } from '../contato/contato.component';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatos: Contato[] = [];
  private idAtual = 1;

  getContatos(): Contato[]{
    return this.contatos;
  }

  adicionarContato(contato: Omit<Contato, 'id'>) {
    const novoContato: Contato = { id: this.idAtual++, ...contato};
    this.contatos.push(novoContato);
  }

  removerContato(id: number) {
    this.contatos = this.contatos.filter(c => c.id !== id);
  }

  getContatoId(id: number): Contato | undefined {
    return this.contatos.find(c => c.id === id);
  }

  constructor() { }
}
