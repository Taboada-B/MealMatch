import { Outlet, Link } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <header>
        <h1>MealMatch! </h1>
        <ThemeSwitcher />
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/home">Discover</Link>
              </li>
              <li>
                <Link to="/favorite">Favorites</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </nav>
        
      </header>

      <Outlet />

      <Footer />
    </ApolloProvider>
  );
};

export default App;
