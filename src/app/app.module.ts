import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Article } from '../pages/article/article';
import { ArticlesList } from '../pages/articles-list/articles-list';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://mobileapi.wp.pl/v1/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    MyApp,
    Article,
    ArticlesList
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ApolloModule.forRoot(provideClient),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Article,
    ArticlesList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
