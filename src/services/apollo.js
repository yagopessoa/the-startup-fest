/* import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
    uri: 'https://startups-project-mytvsxrgeb.now.sh'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client */

import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
})

export default client
