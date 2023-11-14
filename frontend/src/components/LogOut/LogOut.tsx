import React from 'react'
import Button from '../Button'
import { useTypedDispatch } from '../../store/Store';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/action/session/sessionAction';

const LogOut: React.FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logOut("/api/auth/logout"));
        navigate('/')
    }
  return (
    <Button id="logout" onClick={handleLogout}/>
  )
}

export default LogOut