import axios from 'axios'
import { renderMatches } from 'react-router-dom';

class ApiService {
    getPosts() {
        axios({
            method: 'get',
            url: 'http://localhost:3080/api/posts/'
          }).then(res => {
            return res.data
          }).catch(err => console.log(err))
    }

    getUserPosts(id) {
        
    }

    getLikes(postId) {

    }

    getComments(postId) {

    }
}

export default new ApiService();