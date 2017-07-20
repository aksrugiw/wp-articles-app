import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArticlesList } from '../articles-list/articles-list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories;

  constructor(public navCtrl: NavController) {
    this.categories = [null, 'Sport', 'Finanse', 'TV', 'Film', 'Motoryzacja i Technika', 'Inne'];
  }

  chooseCategory(index) {
    this.navCtrl.push(ArticlesList, {
      cid: index
    })
  }

}
