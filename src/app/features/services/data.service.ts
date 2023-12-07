import { Injectable } from '@angular/core';
import { HttpClient ,HttpResponse} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Mushroom } from '../models/mushroom.models';

const mushroomsDataURL = 'http://localhost:3000/mushrooms'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMushrooms(pageNumber: number): Observable<HttpResponse<Mushroom[]>> {
    return this.http.get<Mushroom[]>(`${mushroomsDataURL}?_page=${pageNumber}`, 
    {
        observe: 'response',
        transferCache: {includeHeaders: ['X-total-count']}
      }
    ).pipe(
      catchError((error)=> {
        console.error('get request failed: ', error);
        throw error
      })
    )
  }

  getMushroom(mushroomId: number): Observable<Mushroom> {
    return this.http.get<Mushroom>(`${mushroomsDataURL}/${mushroomId}`).pipe(
      catchError((error)=> {
        console.error('get request failed: ', error);
        throw error
      })
    )
  }

  createMushroom(mushroom: Mushroom){
    debugger
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

 getXtotalcount() {
  return this.http.get(`${mushroomsDataURL}?_page=1`, {observe: 'response', transferCache: {includeHeaders: ['X-total-count']}}).pipe(
    catchError((error)=> {
      console.error('xtotalcount request failed', error);
      throw error
    })
  )
 }

}