import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor() { }

  public state$: Observable<string>;

  ngOnInit() {
    console.log('AboutComponent#ngOnInit');

    // this.Subscription = this.state$
    //   .subscribe((str: string) => {
    //     ;
    //   });
  }

  ngOnDestroy(): void {
    console.log('AboutComponent#ngOnDestroy');
  }

}
