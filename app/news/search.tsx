import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import {getNews} from '../functions/getNews'
import BackButton from '@/components/BackButton'
import Loading from '@/components/Loading'

type Props = {}

const Search = (props: Props) => {
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query, category, country } = useLocalSearchParams<{query: string, category: string, country: string}>();
    
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const results = await getNews({
                category, country, query
            });
            setNews(results);
        })();
        setIsLoading(false);
    }, [query, category, country])

  return (
    <>
        <Stack.Screen options={{
            headerLeft: () => (
                <BackButton/>
            ),
            title: 'Search',
            headerTitleAlign: 'center'
        }} />
        <View style={styles.container}>
            {isLoading ? (
                <Loading size={'large'}/>
            ) : (
                <FlatList 
                    data={news}  
                    keyExtractor={(_, index) => `list_item${index}`}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({index, item}) => {
                        return (
                            <Text>{item.title}</Text>
                        )
                    }}
                />
            )}
        </View>
    </>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20
    }
})