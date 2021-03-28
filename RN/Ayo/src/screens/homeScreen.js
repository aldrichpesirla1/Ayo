import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux';

import {HomeScreenButtons} from '../components/index';
import {icons} from '../constants/icons'
import { getSelectLogin } from '../redux/loginScreen/selectors';
import {getSelectSignup} from '../redux/signupScreen/selectors';

export default function homeScreen({navigation}) {
      const signupval = useSelector(getSelectSignup);
      console.log("Final signup vals ", signupval);

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

