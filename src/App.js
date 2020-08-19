import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
} from "react-native";

import api from "./services/api";

import styles from './styles';
import RepositoryItem from "./components/RepositoryItem";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={project => project.id}
          renderItem={({item: repository}) => (
            <RepositoryItem repository={repository}/>
          )}
        />
      </SafeAreaView>
    </>
  );
}


