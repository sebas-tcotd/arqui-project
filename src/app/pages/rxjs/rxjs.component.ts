import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit {
  constructor() {
    let i = -1;
    const obs$ = new Observable((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });

    obs$.pipe(
      retry()
      ).subscribe(
      (valor) => console.log('subs:', valor),
      (error) => console.warn('error', error),
      () => console.info('complete obs$')
    );
  }

  ngOnInit(): void {}
}
