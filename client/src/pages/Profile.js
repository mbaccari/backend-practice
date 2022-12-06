import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PostCard from '../components/PostCard';
import axios from 'axios';
import styles from './Profile.module.css'

import Api from '../utils/Api'

import Auth from '../utils/Auth';
import Nav from '../components/Nav';
import UserCard from '../components/UserCard';

import ReactPaginate from 'react-paginate'; 
import './pagination.css' 

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ user, setUser ] = useState();
    const [posts, setPosts] = useState(null);
    const [decodedToken, setDecodedToken] = useState('');

    // pagination states and constants
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);

    const PER_PAGE = 1;
    const offset = currentPage * PER_PAGE;
    const currentPageData = data
        .slice(offset, offset + PER_PAGE)
        .map((post, index) => {
            console.log(post)
            return <PostCard user={decodedToken} key={index} postData={post} />
        });
    const pageCount = Math.ceil(data.length / PER_PAGE);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }




    const getUser = `/api/users/${useParams().userId}`;
    const getPosts = `/api/posts/userposts/${useParams().userId}`
    
    useEffect(() => {
        if(cookies.token) {
            if(Auth.isTokenExpired(cookies.token)) {
                removeCookie('token',{path:'/'});
            } else if(Auth.isLoggedIn(cookies.token)) {
                setDecodedToken(Auth.decodeToken(cookies.token))
            }
        }
        axios({
            method: 'get',
            url: getUser
          }).then(res => {
            console.log(res.data)
            if(res.data.length === 0) return;
            axios({
                method: 'get',
                url: getPosts
            }).then(res => {
                let postArray = [];
                if(res.data.length === 0) return;
                for(let i = res.data.length-1; i >= 0; i--) { 
                    postArray.push(res.data[i]);
                }
                setPosts(postArray)
                setData(postArray)
            })
            setUser(res.data)
          }).catch(err => console.log(err))

    }, []);
    
    const arePosts = () => {
        if(!posts ||posts.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            <Nav user={user} page={'home'} />
            {!user ?
                <>
                    <div>Loading</div>
                </>
                
                :
                <div id={styles.pageContainer}>
                    <UserCard userInfo={user} />
                    {!arePosts() ? 'Feed empty': 
                            // <div id={styles.postContainer}>
                            //     {posts.map((post, index) => {
                            //         return (
                            //             <PostCard user={decodedToken} key={index} postData={post} />
                            //         )
                            //     })}
                            // </div>
                            <>
                                <ReactPaginate
                                    activeClassName={'item active '}
                                    breakClassName={'item break-me '}
                                    breakLabel={'...'}
                                    containerClassName={'pagination'}
                                    disabledClassName={'disabled-page'}
                                    marginPagesDisplayed={0}
                                    nextClassName={"item next"}
                                    nextLabel={<i className='bi bi-caret-right' style={{ color: '#2b2d4280'}} />}
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    pageClassName={'item pagination-page '}
                                    pageRangeDisplayed={0}
                                    previousClassName={"item previous"}
                                    previousLabel={<i className='bi bi-caret-left' style={{ color: '#2b2d4280'}} />}
                                />
                                {currentPageData}
                                {/* <ReactPaginate
                                    previousLabel={""}
                                    nextLabel={""}
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"bi bi-arrow-left-circle"}
                                    nextLinkClassName={"bi bi-arrow-right-circle"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"bg-danger"}
                                /> */}
                                
                                
                            </>
                        }
                </div>
            }
        </div>
    )
}

export default Profile;