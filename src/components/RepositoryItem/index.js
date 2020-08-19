import React, { useState } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import api from '../../services/api';

import styles from './styles';

export default function RepositoryItem({ repository }) {
  const [likes, setLikes] = useState(repository.likes)

  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then(response => {
      setLikes(response.data);
    });
  }

  return (
    <View style={styles.repositoryContainer}>
      <Text style={styles.repository}>{repository.title}</Text>

      <View style={styles.techsContainer}>
        <FlatList 
          horizontal={true}
          data={repository.techs}
          keyExtractor={tech => tech}
          renderItem={({item: tech}) => (
            <Text style={styles.tech}>{tech}</Text>
          )}
        />
      </View>

      <View style={styles.likesContainer}>
        <Text
          style={styles.likeText}
          testID={`repository-likes-${repository.id}`}
        >
          {likes} curtidas
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLikeRepository(repository.id)}
        testID={`like-button-${repository.id}`}
      >
        <Text style={styles.buttonText}>Curtir</Text>
      </TouchableOpacity>
    </View>
  );
}
