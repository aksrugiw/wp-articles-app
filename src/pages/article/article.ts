import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



interface ArtQueryResponse{
  article
}

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class Article {
  articleData;
  articleUrl;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private apollo: Apollo
  ) {
  }
  
  ionViewDidLoad() {
    this.articleUrl = this.navParams.get('articleUrl');
    
    const ArticleQuery = gql`
    query Article {
      article(url: "${this.articleUrl}")
      {
        id
        title
        body(t: HTML) {
          data
        }
      }
    }
    `;
    this.apollo.watchQuery<ArtQueryResponse>({
      query: ArticleQuery
    }).subscribe(({data}) => {
      this.articleData = data.article;
    },
    error => this.handleError(error));
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
