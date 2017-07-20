import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  articleData: any;
  articleUrl;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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
        body(t: HTML) {
          data
        }
      }
    }
    `;
    this.apollo.watchQuery<ArtQueryResponse>({
      query: ArticleQuery
    }).subscribe(({data}) => {
      this.articleData = data.article.body;
    });
  }
  
}
