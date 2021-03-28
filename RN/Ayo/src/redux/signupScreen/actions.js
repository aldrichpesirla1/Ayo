import {ActionTypes} from './constants';

export function setUsername(username) {
      return (
            {
                  type: ActionTypes.SET_USERNAME,
                  payload: username
            }
      )
}

export function setName(name) {
      return (
            {
                  type: ActionTypes.SET_NAME,
                  payload: name
            }
      )
}

export function setPassword(password) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD,
                  payload: password 
            }
      )
}

export function setPasswordConfirm(passwordConfirm) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD_CONFIRM,
                  payload: passwordConfirm 
            }
      )
}

export function setContactNumber(contactNumber) {
      return (
            {
                  type: ActionTypes.SET_CONTACT_NUMBER,
                  payload: contactNumber 
            }
      )
}

export function setAddress(address) {
      return (
            {
                  type: ActionTypes.SET_ADDRESS,
                  payload: address
            }
      )
}

export function setRole(role) {
      return (
            {
                  type: ActionTypes.SET_ROLE,
                  payload: role 
            }
      )
}


export function setValidId(valid_id1) {
      return (
            {
                  type: ActionTypes.SET_VALID_ID,
                  payload: valid_id1 
            }
      )
}


export function setBusinessPermit(business_permit) {
      return (
            {
                  type: ActionTypes.SET_BUSINESS_PERMIT,
                  payload: business_permit 
            }
      )
}


export function setMedicalLicense(medical_license) {
      return (
            {
                  type: ActionTypes.SET_MEDICAL_LICENSE,
                  payload: medical_license 
            }
      )
}