import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Suspense, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios';
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'
import { getNews } from '../functions/getNews'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // getBreakingNews();
    // getNews('');
  }, [])

  const getBreakingNews = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=kr&size=5`);
      // if (response && response.data) {
      //   setBreakingNews(response.data.results);
      // }
      const results = await getNews({});
      setBreakingNews(results);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  const getCategoryNews = async (category: string) => {
    const results = await getNews({category});
    setNews(results);
  }
  const onCatChanged = (category: string) => {
    setNews([]);
    getCategoryNews(category);
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop + 10 }]}>
      <Header />
      <SearchBar withHorizontalPadding />
      {/* {
        isLoading ? <Loading size={'large'}/> :
          <BreakingNews
            newsList={breakingNews}
          />
      } */}
      <Categories
        onCatChanged={onCatChanged}
      />
      <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})