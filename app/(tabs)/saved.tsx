import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNewsForId } from '../functions/getNews';
import { Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { NewsItem } from '../news/Search';
import { useIsFocused } from '@react-navigation/native';
type Props = {}

const Saved = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    const token = await AsyncStorage.getItem('bookmark')

    if (token) {
      const res = JSON.parse(token);
      let bookmarkIds = res.join(',');
      if (bookmarkNews.length === 0) setIsLoading(true);
      const news = await getNewsForId({
        id: bookmarkIds
      })
      setBookmarkNews(news);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTitleAlign: 'center'
      }} />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={'large'} />
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <NewsItem item={item} />
              )
            }}
          />
        )}
      </View>
    </>

  )
}

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  }
})