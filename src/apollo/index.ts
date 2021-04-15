import { ApolloClient, InMemoryCache } from '@apollo/client';
import Config from 'react-native-config';

const apolloClient = new ApolloClient({
  uri: Config.API_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;
