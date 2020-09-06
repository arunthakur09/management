import React from 'react'
export const Button = ({children, type, onClick, isActive}) => {
    //const buttonClasses = ['Button']
    
    // type !== null ? buttonClasses.push(`Button--is-green`) : buttonClasses.push('Button--is-default')
    // isActive ? buttonClasses.push('Button--is-active') : buttonClasses.push('Button--is-inactive')
    
    return (
        <button style={{backgroundColor:"rgb(66, 172, 0)" ,textAlign:"center",padding:"5px",fontSize:"13px", color:"white",borderRadius: "360px",height:"34px",width:"130px"}}onClick={onClick} className="resume">{children}</button>
    )
}