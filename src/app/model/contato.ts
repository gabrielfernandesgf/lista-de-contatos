import {ContatoGrupo} from './ContatoGrupo';

export interface Contato {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  favorito?: boolean;
  grupos: ContatoGrupo[];
}
