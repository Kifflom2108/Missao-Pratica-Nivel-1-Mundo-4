import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  catContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  catImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  catName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

const CatApp = () => {
  const Cat = (props) => {
    return (
      <View style={styles.catContainer}>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
          }}
          style={styles.catImage}
        />
        <Text style={styles.catName}>Hello, I am {props.name}!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
      <Text style={styles.text}>Hello, I am your cat!</Text>
    </View>
  );
};

export default CatApp;
