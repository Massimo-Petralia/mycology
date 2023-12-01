import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mycology';
}

//setter example (oject and class) and assign initial value by constructor (class)
const persona = {
  email: '',
  set setEmail(v: string) {
    this.email = `${v} PEC`;
  },
};

persona.setEmail = 'miaemail@gmail.com';

console.log('valore oggetto persona: ', persona.email);

class Person {
  constructor(email : string) {
    this.email = email
  }
  email: string;
  public set setEmail(v: string) {
    this.email = `${v} Hotmail accont`;
  }
}
const mario = new Person('<initial-values>');
console.log('valore iniziale classe', mario.email)
mario.setEmail = 'mario@hotmail.it';

// expected output for mario.email:  mario@hotmail.it Hotmail accont

console.log('valore della proprietà di classe: ', mario.email);

mario.setEmail = 'email-lavoro@hotmail.it'

console.log('valore della proprietà di classe: ', mario.email);

