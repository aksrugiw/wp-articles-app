import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Article } from './article';

@NgModule({
  declarations: [
    Article,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    Article
  ]
})
export class ArticleModule {}
