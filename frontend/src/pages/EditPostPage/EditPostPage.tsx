import React from 'react'
import EditForm from '../../components/EditForm'
import LogOut from '../../components/LogOut'

const EditPostPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-[20px]">
      <LogOut/>
    <h4>Create Post</h4>
    <EditForm/>
  </div>
  )
}

export default EditPostPage