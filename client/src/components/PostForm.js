import React from 'react';

const PostForm = () => {
    return (
        <form action="">
            <label htmlFor='title'>Title: </label>
            <input name='title' type="text" />

            <label htmlFor='body'>Body: </label>
            <input name='body' type="text" />
        </form>
    )
}

export default PostForm;