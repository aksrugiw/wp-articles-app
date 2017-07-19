import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ArticleQuery = gql`
  query Article {
    article(url: "https://sportowefakty.wp.pl/koszykowka/700011/blk-jordan-w-ostrovii-a-sosna-w-slezie-maliszewska-liczy-na-sile-zespolu")
    {
      id
      body {
        data
      }
    }
}
`;

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo
  ) {
  }

  ionViewDidLoad() {
    this.apollo.watchQuery<QueryResponse>({
      query: ArticleQuery
    }).subscribe(({data}) => {
      this.article = data.article.body[1].data;
    });
  }

}
