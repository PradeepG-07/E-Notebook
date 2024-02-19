import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        if(word==='info'){
            word="Invalid"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div className='pt-1' style={{height: '50px', backgroundColor: "#000000"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert