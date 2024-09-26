import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<ActivityIndicator> & Readonly<ActivityIndicatorProps>) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props }/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}) 