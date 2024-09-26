import { StyleSheet, Text, TouchableOpacity, ScrollView, Image, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { NewsDataType } from '@/types'
import axios from 'axios'
import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'
import Moment from 'moment'
import BackButton from '@/components/BackButton'

type Props = {}

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getNewsForID();
    }, [])

    const getNewsForID = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`);
            if (response && response.data) {
                setNews(response.data.results[0]);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerLeft: () => (
                    <BackButton/>
                ),
                headerRight: () =>
                (
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Ionicons name='heart-outline' size={22} />
                    </TouchableOpacity>
                ),
                title: ''
            }} />
            <View style={styles.contentContainer}>

                {
                    isLoading || news === undefined ? (
                        <Loading size={'large'} />
                    ) : (
                        <ScrollView>
                            <Text style={styles.title}>{news.title}</Text>
                            <View style={styles.newsInfoWrapper}>
                                <Text style={styles.newsInfo}>{Moment(news.pubDate).format('MMMM DD, hh:mm a')}</Text>
                                <Text style={styles.newsInfo}>{news.source_name}</Text>
                            </View>
                            <Image source={{ uri: news.image_url }} style={styles.newsImg} />
                            {news.content ? (
                                <Text style={styles.newsContent}>{news.content}</Text>
                            ) : (
                                <Text style={styles.newsContent}>{news.description}</Text>
                            )}

                        </ScrollView>
                    )
                }
            </View>
        </View>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
        letterSpacing: 0.6
    },
    newsImg: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10
    },
    newsInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22
    }
})