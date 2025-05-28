import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { fetchMovies } from '../../redux/actions/fetchAlbums';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface Movie {
  trackId: number;
  trackName: string;
  releaseDate: string;
  artworkUrl100: string;
  trackViewUrl: string;
  previewUrl: string;
  shortDescription?: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useSelector((state: RootState) => state.albumReducer);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderItem = ({ item }: ListRenderItemInfo<Movie>) => (
    <TouchableOpacity onPress={() => openLink(item.trackViewUrl)}>
      <View style={[styles.itemContainer, isLandscape && styles.itemContainerLandscape]}>
        <FastImage
          source={{ uri: item.artworkUrl100 }}
          style={[
            styles.thumbnail,
            isLandscape && { width: width * 0.2, height: width * 0.2 },
          ]}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.info}>
          <Text style={[styles.title, isLandscape && { fontSize: 20 }]}>{item.trackName}</Text>
          <Text style={styles.date}>Released: {new Date(item.releaseDate).toDateString()}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.shortDescription || 'No description'}
          </Text>
          {item.previewUrl && (
            <Video
              source={{ uri: item.previewUrl }}
              style={[
                styles.video,
                isLandscape
                  ? { width: width * 0.5, height: height * 0.5 }
                  : { width: width * 0.8, height: height * 0.25 },
              ]}
              resizeMode="cover"
              muted
              repeat
              paused={false}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.trackId?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No Data Found</Text>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  itemContainerLandscape: {
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'blue',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: 'red',
  },
  video: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
