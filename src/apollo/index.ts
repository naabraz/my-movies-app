import ApolloClient from 'apollo-boost';
import Config from 'react-native-config';

const apolloClient = new ApolloClient({
  uri: Config.API_URL,
});

export default apolloClient;
