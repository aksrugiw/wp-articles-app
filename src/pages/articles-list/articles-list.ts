import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Article } from '../article/article';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ArticlesListQuery = gql`
  query ArticlesList {
    tileset(t: Article) {
      title
      url
      img {
        url
        h
        w
      }
    } 
  }
`;

interface QueryResponse{
  tileset
}

@Component({
  selector: 'page-articles-list',
  templateUrl: 'articles-list.html',
})
export class ArticlesList {
  articles;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo
  ) {
  }


  ionViewDidLoad() {
    this.apollo.watchQuery<QueryResponse>({
      query: ArticlesListQuery
    }).subscribe(({data}) => {
      this.articles = data.tileset
    });
  }

  showArticle(articleUrl) {
    this.navCtrl.push(Article, {
      articleUrl: articleUrl
    });
  }

}
