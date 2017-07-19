import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



interface QueryResponse{
  article,
  t
}

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class Article {
  article: any;
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
        body {
          data
        }
      }
    }
    `;
    this.apollo.watchQuery<QueryResponse>({
      query: ArticleQuery
    }).subscribe(({data}) => {
      this.article = data.article.body[1].data;
    });
  }
  
}
