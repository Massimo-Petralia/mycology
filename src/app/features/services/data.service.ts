import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Mushroom } from '../models/mushroom.models';
import { error } from 'console';

const mushroomsDataURL = 'http://localhost:3000/mushrooms'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMushrooms(): Observable<Mushroom[]> {
    return this.http.get<Mushroom[]>(mushroomsDataURL).pipe(
      catchError((error)=> {
        console.error('get request failed: ', error);
        throw error
      })
    )
  }

  getMushroom(mushroomId: string): Observable<Mushroom> {
    return this.http.get<Mushroom>(`${mushroomsDataURL}/${mushroomId}`).pipe(
      catchError((error)=> {
        console.error('get request failed: ', error);
        throw error
      })
    )
  }

  createMushroom(mushroom: Mushroom): Observable<Mushroom> {
    return this.http.post<Mushroom>(mushroomsDataURL, mushroom).pipe(
      catchError((error)=>{
        console.error('post request failed', error);
        throw error
      })
    )
  }

 updateMushroom(mushroom: Mushroom) : Observable<Mushroom> {
  return this.http.put<Mushroom>(`${mushroomsDataURL}/${mushroom.id}`, mushroom).pipe(
    catchError((error)=> {
      console.error('put request failed', error);
      throw error
    })
  )
 }

 deleteMushroom(id: number){
  return this.http.delete(`${mushroomsDataURL}/${id}`).pipe(
    catchError((error)=> {
      console.error('delete request failed', error);
      throw error
    })
  )
 }

}