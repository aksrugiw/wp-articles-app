import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';

import { Article } from '../article/article';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



interface QueryResponse{
  articles
}

@Component({
  selector: 'page-articles-list',
  templateUrl: 'articles-list.html',
})
export class ArticlesList {
  categoryId;
  categoryName;
  articles;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private apollo: Apollo
  ) {
  }


  ionViewDidLoad() {
    this.categoryId = this.navParams.get('cid');
    this.categoryName = this.navParams.get('categoryName');

    const ArticlesListQuery = gql`
  query ArticlesList {
    articles(cid:${this.categoryId}, t: Article) {
      title
      url
      img {
        url
        h
        w
      }
      tags
    } 
  }
`;
    this.apollo.watchQuery<QueryResponse>({
      query: ArticlesListQuery
    }).subscribe(({data}) => {
      this.articles = data.articles;
    },
    error => this.handleError(error));
  }

  showArticle(articleUrl) {
    this.navCtrl.push(Article, {
      articleUrl: articleUrl
    });
  }

  handleError(error) {
    let alert = this.alertCtrl.create({
      title: 'Wystąpił błąd',
      subTitle: 'Treść błędu: ' + error,
      buttons: ['OK']
    });
    alert.present();
  }

}
