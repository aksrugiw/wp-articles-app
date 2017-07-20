import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  articles;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo
  ) {
  }


  ionViewDidLoad() {
    this.categoryId = this.navParams.get('cid');

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
    } 
  }
`;
    this.apollo.watchQuery<QueryResponse>({
      query: ArticlesListQuery
    }).subscribe(({data}) => {
      this.articles = data.articles;
    });
  }

  showArticle(articleUrl) {
    this.navCtrl.push(Article, {
      articleUrl: articleUrl
    });
  }

}
