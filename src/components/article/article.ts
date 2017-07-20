import { Component } from '@angular/core';

/**
 * Generated class for the Article component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class Article {

  text: string;

  constructor() {
    console.log('Hello Article Component');
    this.text = 'Hello World';
  }

}
