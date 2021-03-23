import React, {useEffect} from 'react'
import { View, Text } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from 'reselect';

import {makeSelectUsers} from '../redux/testScreen/selectors';
import testScreen from '../api/testScreen';
import setUsers from '../redux/testScreen/actions';
import axios from 'axios';

const stateSelector = createSelector(makeSelectUsers, (users) => ({
      users
}))

const actionDispatch = (dispatch) => ({
      setUser: (users) => dispatch(setUsers(users))
})

export default function apiTestScreen() {
      const valsel = useSelector(stateSelector);
      const {users} = useSelector(stateSelector);
      const {setUser} = actionDispatch(useDispatch());

      console.log("Valsel is: ", valsel);

      const fetchUsers = async () => {
            console.log("Testscreen is: ", testScreen)
            // const response = await testScreen.get('http://localhost:8000/users/users').catch((err) => {
            const response = await testScreen.get('users').catch( (err) => {
                  console.log("Error occured: ", err);
            })
            console.log("Response is: ", response);

            // setUser(response.data);
      }

      // console.log("users: ", users);

      useEffect(() => {
            fetchUsers()
      },[])

      return(
            <View>
                  <Text>Hello</Text>
            </View>
      )
}
