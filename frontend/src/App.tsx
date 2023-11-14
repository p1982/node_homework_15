import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/";
import NewspostDetailPage from "./pages/NewspostDetailPage";
import CreateNewsPostPage from "./pages/CreateNewsPostPage";
import { RootStore, useTypedDispatch, useTypedSelector } from "./store/Store";
import { getNewsPosts } from "./store/action/newsposts/newspostsAction";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import { UserType } from "./store/action/session/sessionActionTypes";
import PostPage from "./pages/PostPage";
import SignUpPage from "./pages/SignUpPage";

const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const user:UserType | null = useTypedSelector((state: RootStore) => state.session.user);
  console.log(user);
  
  useEffect(() => {
    const init = async () => {
      dispatch(getNewsPosts("/api/newsposts?page=1&size=6"));
    };
    init();
  }, [dispatch]);
  // if(!user){
  //   navigate("/")
  // }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {user?.token && (
        <>
          <Route path="/newsposts" element={<PostPage />} />
          <Route path="/newsposts/create" element={<CreateNewsPostPage />} />
          <Route path="/newsposts/:id" element={<NewspostDetailPage />} />
          <Route path="/newsposts/:id/edit" element={<EditPostPage />} />
        </>
      )}
      <Route element={<h1>Not Found</h1>} />
    </Routes>
  );
};
export default App;
