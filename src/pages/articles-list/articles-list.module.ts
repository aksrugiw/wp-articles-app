import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesList } from './articles-list';

@NgModule({
  declarations: [
    ArticlesList,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesList),
  ],
  exports: [
    ArticlesList
  ]
})
export class ArticlesListModule {}
