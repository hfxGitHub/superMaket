import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const USERTYPE = 'userType'
const USERID = 'userID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserID(userID) {
	return Cookies.set(USERID, userID)
}

export function getUserID() {
  return Cookies.get(USERID)
}

export function setUserType(userType) {
  return Cookies.set(USERTYPE, userType)
}

export function getUserType() {
  return Cookies.get(USERTYPE)
}
