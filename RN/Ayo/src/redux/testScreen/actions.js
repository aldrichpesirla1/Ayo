import {ActionTypes} from './constants';

export default function setUsers(users) {
      return (
            {
                  type: ActionTypes.SET_USERS,
                  payload: users
            }
      )
}
