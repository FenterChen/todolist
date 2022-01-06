import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo';

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: 'http://35.189.161.175:8080/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'myadminsecretkey',
  }
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
