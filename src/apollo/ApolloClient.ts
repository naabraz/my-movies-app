import ApolloClient from 'apollo-boost';
import Config from 'react-native-config';

const client = new ApolloClient({
  uri: Config.API_URL,
});

export default client;
