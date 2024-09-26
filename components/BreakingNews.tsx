import { StyleSheet, Text, View, FlatList, ViewToken, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import SliderItem from '@/components/SliderItem'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue, scrollTo } from 'react-native-reanimated'
import Pagination from '@/components/Pagination'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    const { width } = useWindowDimensions();

    const onViewableItemsChanged = useCallback(({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null
        ) {
            setPaginationIndex(viewableItems[0].index % newsList.length)
        }
    }, [newsList]);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    }

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged }
    ])

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        }
    })

    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                if(paginationIndex === data.length - 1) {
                    offset.value = 0
                    setPaginationIndex(0);
                } else {
                    offset.value = offset.value + width;
                }
            }, 5000)
        } else {
            clearInterval(interval.current)
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [isAutoPlay, offset, width, paginationIndex]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BreakingNews</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    disableVirtualization={false}
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem
                            slideItem={item}
                            index={index}
                            scrollX={scrollX}
                        />
                    )}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {}}
                    viewabilityConfigCallbackPairs={
                        viewabilityConfigCallbackPairs.current
                    }
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}
                />
                <Pagination
                    items={newsList}
                    index={paginationIndex}
                    scrollX={scrollX}
                />
            </View>
        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        // width: '100%',
        // flex: 1,
        justifyContent: 'center'
    }
})