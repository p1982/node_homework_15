import React from 'react'
import PostList from "../../components/PostsList";
import { NavLink } from "react-router-dom";
import LogOut from '../../components/LogOut';

const PostPage: React.FC = () => {
    return (
      <div className="max-w-[1200px] mx-auto my-[20px]">
        <div>
        <LogOut/>
        </div>
        <NavLink to='/newsposts/create' className='bg-red-600 rounded border-none py-2 px-5 inline-block mb-5'>Create Post</NavLink>
        <PostList />
      </div>
    );
  };

export default PostPage