import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  isToken(token) {
    // If there is a token and it's not expired, return `true`
    if(token) {
      return true;
    } 
    return false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  decodeToken(token) {
    const decoded = decode(token);
    console.log(decoded)
    return decoded.data.email
  }
}

export default new AuthService();