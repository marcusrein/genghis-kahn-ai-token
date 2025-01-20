import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://api.studio.thegraph.com/query/45871/genghis-kahn-ai-token/version/latest",
	cache: new InMemoryCache(),
});

export default client;
