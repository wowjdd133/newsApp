import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import { getNews } from '../functions/getNews'
import BackButton from '@/components/BackButton'
import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'

type Props = {}

export const NewsItem = ({ item }: { item: NewsDataType }) => {
    return (
        <Link href={`/news/${item.article_id}`} asChild key={item.article_id}>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image source={{ uri: item.image_url }} style={styles.itemImg} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.itemSourceInfo}>
                            <Image source={{ uri: item.source_icon }} style={styles.itemSourceImg} />
                            <Text style={styles.itemSourceName}>{item.source_name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const Search = (props: Props) => {
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query, category, country } = useLocalSearchParams<{ query: string, category: string, country: string }>();

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
                    <BackButton />
                ),
                title: 'Search',
                headerTitleAlign: 'center'
            }} />
            <View style={styles.container}>
                {isLoading ? (
                    <Loading size={'large'} />
                ) : (
                    <FlatList
                        data={news}
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

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        gap: 10
    },
    itemImg: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-between'
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: 'capitalize'
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.black
    },
    itemSourceInfo: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    itemSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 20
    },
    itemSourceName: {
        fontSize: 10,
        fontWeight: '400',
        color: Colors.darkGrey
    }
})