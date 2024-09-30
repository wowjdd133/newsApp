import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <>
    <Stack.Screen options={{
      headerShown: true
    }}/>
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemBtn}>
      <Text style={styles.itemBtnTxt}>About</Text>
      <MaterialIcons name='arrow-forward-ios' size={22} color={Colors.lightGrey}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemBtn}>
      <Text style={styles.itemBtnTxt}>Send Feedback</Text>
      <MaterialIcons name='arrow-forward-ios' size={22} color={Colors.lightGrey}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemBtn}>
      <Text style={styles.itemBtnTxt}>Privacy Policy</Text>
      <MaterialIcons name='arrow-forward-ios' size={22} color={Colors.lightGrey}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemBtn}>
      <Text style={styles.itemBtnTxt}>Terms of Use</Text>
      <MaterialIcons name='arrow-forward-ios' size={22} color={Colors.lightGrey}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
      <Text style={styles.itemBtnTxt}>Dark Mode</Text>
      <Switch
        trackColor={{false: '#767577', true: '#3e3e3e'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{marginBottom: -15, marginRight: -8}}
      />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemBtn}>
      <Text style={[styles.itemBtnTxt, {color: 'red'}]}>Logout</Text>
      <MaterialIcons name='logout' size={22} color={'red'}/>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
    alignItems:'center'
  },
  itemBtnTxt: {
    fontSize: 16,
    fontWeight: '700',

  }
})