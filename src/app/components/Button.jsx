import React from 'react'

const Button = (props) => {

    const onClickHandler = () => {
        props.onClick()
    }

    return (
        <input type="button" value={props.value} className={props.className} onClick={onClickHandler}></input>
    )
}

export default Button