import React from 'react'

const Message = (props) => {
    return (

        <div className={props.className} >
            <h2 className={props.nameClass}>{props.text}</h2>
        </div>
    )
}

export default Message