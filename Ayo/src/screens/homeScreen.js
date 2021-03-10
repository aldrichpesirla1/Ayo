import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import {HomeScreenButtons} from '../components/index';
import {icons} from '../constants/icons'
export default function homeScreen({navigation}) {
      return (
            <View>
                  <HomeScreenButtons buttonVals={[
                        {title: "View Medicine Items", img:icons.homeScreenButton1, screen:"ViewMedItems"},
                        {title: "Screen2", img:icons.homeScreenButton1 },
                        {title: "Screen3", img:icons.homeScreenButton1 }
                  ]}/>
                  <HomeScreenButtons buttonVals={[
                        {title: "Screen4", img:icons.homeScreenButton1},
                        {title: "Screen5", img:icons.homeScreenButton1 },
                        {title: "Screen6", img:icons.homeScreenButton1 }
                  ]}/>
                  <HomeScreenButtons buttonVals={[
                        {title: "Screen7", img:icons.homeScreenButton1},
                        {title: "Screen8", img:icons.homeScreenButton1 },
                        {title: "Screen9", img:icons.homeScreenButton1 }
                  ]}/>
            </View>
      )
}

