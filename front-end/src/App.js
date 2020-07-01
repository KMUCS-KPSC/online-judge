import React from 'react';
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import {AppolloProvider, Query, ApolloProvider} from 'react-apollo'
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:9090'
});

const PeopleList = () => (
  <Query
    query={gql`
      query {
        peoples{
          age
          id
          name
          gender
        }
      }
    `
  }
  >
    {({loading, error, data}) => {
      if(loading) return <p>Loading...</p>;
      if(error) return <p>Error :(</p>;
      return data.peoples.map(({id, age, name, gender}) => (
        <div key={id}>
          <p>[{id}] {name}: {age}살, 성별: {gender}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app</h2>
    </div>
    <PeopleList/>
  </ApolloProvider>
);

export default App;
