import React from 'react'
import classNames from 'classnames'
export default function ChatList(props) {
    let messages = props.messages;
    return (
        <div className={"message-container"}>
            <div className={"message-list"}>
                {props.messages.length > 0 && messages.map((obj) =>
                    (<div className={classNames({'message-self': obj.role === process.env.REACT_APP_USER,
                    'message-other': obj.role !== process.env.REACT_APP_USER
                    })}>
                        {obj.role !== process.env.REACT_APP_USER&&(<div className={"icon"}>
                            <i className="material-icons">
                                person
                            </i>
                        </div>)}
                        <div className={"message-item"}>
                       {obj.message}
                        </div>
                    </div>)
                )}


            </div>.

        </div>
    )
}