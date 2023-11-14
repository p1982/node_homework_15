import React from "react";

import CreateForm from "../../components/CreateForm";
import LogOut from "../../components/LogOut";

const CreateNewsPostPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-[20px]">
      <LogOut/>
      <h4>Create NewsPost</h4>
      <CreateForm/>
    </div>
  );
};

export default CreateNewsPostPage;
