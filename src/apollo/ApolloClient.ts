import ApolloClient from 'apollo-boost';
import Config from 'react-native-config';

export const apolloClient = new ApolloClient({
  uri: Config.API_URL,
});
