import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
  onCatChanged: (category:string) => void;
}

const Categories = ({onCatChanged}: Props) => {

  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      if(Platform.OS === 'ios') {
        scrollRef.current?.scrollTo({x: x - 20, y: 0, animated:true})
      }
    })
    onCatChanged(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index) => (
            <TouchableOpacity 
              ref={(el) => itemRef.current[index] = el}  
              key={index} 
              style={[styles.item, activeIndex === index && styles.itemActive]}
              onPress={() => handleSelectCategory(index)}  
            >
                <Text style={[styles.itemTxt, activeIndex === index && styles.itemTxtActive]}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        fontSize: 19,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20
    },
    itemsWrapper: {
      gap: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10
    },
    item: {
      borderWidth: 1,
      borderColor: Colors.darkGrey,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    itemActive: {
      backgroundColor: Colors.tint,
      borderColor: Colors.tint
    },
    itemTxt: {
      fontSize: 14,
      color: Colors.darkGrey,
      letterSpacing: 0.5
    },
    itemTxtActive: {
      fontWeight: '600',
      color: Colors.white
    }
})