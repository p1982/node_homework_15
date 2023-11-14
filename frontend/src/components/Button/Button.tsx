import React, {MouseEventHandler} from 'react'
import { buttonConfig } from './buttonConfig';
interface IButton {
    id: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
const Button: React.FC<IButton> = ({id, onClick}) => {
    const btn = buttonConfig[id]
  return (
    <button className={`${btn.className}`} type={btn.type} onClick={onClick}>{btn.text}</button>
  )
}

export default Button