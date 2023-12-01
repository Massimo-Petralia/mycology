import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  currentViewStateSubject = new BehaviorSubject<string>('list');
  currentViewState$ = this.currentViewStateSubject.asObservable();

  setViewState(newViewState: string) {
    this.currentViewStateSubject.next(newViewState);
  }
}
