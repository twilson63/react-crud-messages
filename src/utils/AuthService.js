import Auth0Lock from 'auth0-lock'
const { hashHistory } = require('react-router')

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: '//placekitten.com/58/58'
      },
      socialButtonStyle: 'small'
    })
    //this.lock.options.theme.logo = '//placekitten.com/64/64'
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
    this.lock.getProfile(authResult.idToken, (err, profile) => {
      //console.log(profile)
      this.setNickname(profile.nickname)
    })
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  setNickname (name) {
    localStorage.setItem('nickname', name)
  }

  getNickname() {
    return localStorage.getItem('nickname')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('nickname')
    hashHistory.push('/login')
  }
}
