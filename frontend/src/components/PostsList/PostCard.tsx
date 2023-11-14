import React from "react";
import { RootStore, useTypedDispatch, useTypedSelector } from "../../store/Store";
import { deleteNewsPost } from "../../store/action/newsposts/newspostsAction";
import Button from "../Button";
import { NavLink } from "react-router-dom";
interface IPostCard {
  id: string;
}

const PostCard: React.FC<IPostCard> = ({ id }) => {
  const dispatch = useTypedDispatch();
  const newspost = useTypedSelector((state: RootStore) => {
    if (state.newsposts && state.newsposts.newsposts && state.newsposts.newsposts[id]) {
      return state.newsposts.newsposts[id];
    }
    return {title: '', text:'', genre:'Other', isPrivate: false}; // Provide a default value or handle the case when 'post' is not found
  });
  const handleDelete = (id:string) => {
    dispatch(deleteNewsPost('/api/newsposts/', id))
  } 
  return (
    <li className="flex flex-col gap-5 rounded shadow-2xl p-5 shadow-black border-2 border-solid">
      <h2>Title: {newspost.title}</h2>
      <p>Post: {newspost.text}</p>
      <p>Genre: {newspost.genre}</p>
      <p>NewsPost is Private: {(newspost.isPrivate) ? 'Private' : 'not Private'}</p>
      <NavLink className='bg-red-600 rounded border-none py-2 px-5' to={`/newsposts/${id}`}>Show Details</NavLink>
      <Button id='delete' onClick={()=>handleDelete(id)}/>
    </li>
  );
};

export default PostCard;
