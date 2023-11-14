import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  RootStore,
  useTypedDispatch,
  useTypedSelector,
} from "../../store/Store";
import { getNewspostById } from "../../store/action/newsposts/newspostsAction";
import { NavLink } from "react-router-dom";
import LogOut from "../../components/LogOut";
const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'Decenber']
const NewspostDetailPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const newspost = useTypedSelector(
    (state: RootStore) => (id ? state.newsposts?.newsposts?.[id] : null)
  );
   
  useEffect(() => {
    if (id) {
      dispatch(getNewspostById("/api/newsposts/", id));
    }
  }, [id, dispatch]);
  if (!newspost) {
    return <div>Loading...</div>; // You can replace this with a loading component or message
  }
  const formatDate = (date:Date):string => {
    const newDate = new Date(date)

    
    const month = monthes[newDate.getMonth()]
    return `${newDate.getFullYear()}-${month}-${newDate.getDate()}, ${newDate.getHours()}:${newDate.getMinutes()}`
  }
  return (
    <div className="max-w-[1200px] mx-auto my-[20px]">
      <NavLink
        className="bg-red-600 rounded border-none py-2 px-5 mt-3 inline-block"
        to="/"
      >
        Home
      </NavLink>
      <LogOut/>
      <h2>Title: {newspost.title}</h2>
      <p>Text: {newspost.text}</p>
      <p>Genre: {newspost.genre}</p>
      <p>NewsPost is Private: {(newspost.isPrivate) ? 'Private' : 'not Private'}</p>
      <p>Created: {newspost.createDate?formatDate(newspost.createDate):''}</p>
      <NavLink
        className="bg-red-600 rounded border-none py-2 px-5 mt-3 inline-block"
        to={`/newsposts/${newspost.id}/edit`}
      >
        Update
      </NavLink>
    </div>
  );
};

export default NewspostDetailPage;
