import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { fetchMovies } from '../../redux/actions/fetchAlbums';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(state => state.albumReducer);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  const openLink = url => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.trackId?.toString() || Math.random().toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => openLink(item.trackViewUrl)}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.artworkUrl100 }} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.trackName}</Text>
              <Text style={styles.date}>Released: {new Date(item.releaseDate).toDateString()}</Text>
              <Text style={styles.description} numberOfLines={3}>{item.shortDescription || 'No description'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  itemContainer: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  thumbnail: { width: 100, height: 100, borderRadius: 6 },
  info: { flex: 1, paddingLeft: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666', marginBottom: 5 },
  description: { fontSize: 13, color: '#333' }
});
