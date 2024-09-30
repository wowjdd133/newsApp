import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors';
import Loading from '@/components/Loading';
import { Link } from 'expo-router';
import { NewsItem } from '@/app/news/Search';

type Props = {
    newsList: Array<NewsDataType>;
}

const NewsList = ({ newsList }: Props) => {
    return (
        <View style={styles.container}>
            {newsList.length === 0 ? <Loading size={'large'} /> : newsList.map((item, index) => (
                <NewsItem item={item} />
            ))}
        </View>
    )
}

export default NewsList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 50,
    },
})