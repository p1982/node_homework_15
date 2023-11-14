import React from "react";
import { RootStore, useTypedDispatch, useTypedSelector } from "../../store/Store";
import PostCard from "./PostCard";
import { NewspostType } from "../../store/action/newsposts/newspostsActionTypes";
import ReactPaginate from "react-paginate";
import { getNewsPosts } from "../../store/action/newsposts/newspostsAction";

const PostList: React.FC = () => {
  const dispatch = useTypedDispatch()
  const newspostList = useTypedSelector((state: RootStore) =>
    Object.values(state.newsposts?.newsposts ?? {})
  );
  const pageCount = useTypedSelector(
    (state: RootStore) => state.newsposts.page
  );
  const handlePageClick = (selectedItem: { selected: number }) => {
    dispatch(getNewsPosts(`/api/newsposts?page=${selectedItem.selected}&size=6`));
  };
  return (
    <>
      <ul className="grid grid-cols-3 gap-5 h-[700px]">
        {newspostList.map((newsposts: NewspostType) => (
          <PostCard key={newsposts.id} id={newsposts.id} />
        ))}
      </ul>
      {pageCount && (
        <div className="flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex gap-10 my-10 p-10"
          />
        </div>
      )}
    </>
  );
};

export default PostList;
