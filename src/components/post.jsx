import React from 'react';
import '../App.css'
import {Link} from 'react-router-dom'

const Post = ({title, description, image, view, id, changeID}) => {

    return (
        <div className="ui items">
            <div className="item">
                <a className="ui small image">
                <img src={image} />
                </a>
                <div className="content">
                    <Link className="header" to={`/id/${id}`} onClick={() => changeID(id)}>{title}</Link>
                    <div className="description">
                        <p>
                            {description.length > 300 ? description.slice(0,300)+' ...': description}
                        </p>
                        <div className="ui label icon_eye">
                            <i className="eye icon"></i> {view}
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;