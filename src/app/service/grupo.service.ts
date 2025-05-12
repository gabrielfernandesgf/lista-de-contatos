import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Grupo} from '../model/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  url: string = 'http://localhost:8080/grupos';

  private grupoSubject = new BehaviorSubject<Grupo[]>([]);
  public grupos$ = this.grupoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarGrupos();
  }

  private carregarGrupos(): void {
    this.http.get<Grupo[]>(this.url).subscribe(grupos => {
      this.grupoSubject.next(grupos);
    });
  }

  findAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.url)
  }

  save(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.url, grupo).pipe(
      tap(() => this.carregarGrupos())
    );
  }

  updateGrupo(id: number, grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.url}/${id}`, grupo).pipe(
      tap(() => this.carregarGrupos())
    );
  }

  deleteGrupo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => this.carregarGrupos())
    );
  }

  criarOuBuscarGrupo(nome: string) {
    return this.http.post<Grupo>(`http://localhost:8080/grupos/buscar-ou-criar`, { nome }).pipe(
      tap((novoGrupo) => {
        const grupos = this.grupoSubject.getValue();
        const existe = grupos.find(g => g.id === novoGrupo.id);
        if (!existe) {
          this.grupoSubject.next([...grupos, novoGrupo]);
        }
      })
    );
  }

  atualizarGrupos(grupos: Grupo[]): void {
    this.grupoSubject.next(grupos);
  }

}
