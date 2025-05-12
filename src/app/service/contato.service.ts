import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contato} from '../model/contato';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = 'http://localhost:8080/contato';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url)
  }

  findById(id: number): Observable<Contato>{
    return this.http.get<Contato>(this.url+'/'+id)
  }

  save(contato: Contato): Observable<Contato>{
    const ContatoAdaptado = {
      ...contato,
      grupos: contato.grupos?.map((g) => ({
        grupo: {id: g.grupo.id}
      })) ?? []
    };
    return this.http.post<Contato>(this.url, ContatoAdaptado)
  }

  update(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(this.url, contato)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  vincularGrupo(contatoId: number, grupoId: number) {
    return this.http.put(`/api/contatos/${contatoId}/grupo/${grupoId}`, {});
  }

}

