import React from 'react'
import {Link} from 'react-router-dom'

const ViewPost = ({state}) => {
    
    const {title, image, description,view} = state;
    return (
         <div className='viewPost'>
              <h3>{title}</h3>
              <div className="arrow"><Link to="/"><i className="angle left icon"></i>Назад</Link></div>
            <div className="ui divider"></div>
           
            <div className="ui items">
            <div className="item">
                <a className="ui small image">
                <img src={image} />
                </a>
                <div className="content">                 
                    <p>
                        {description}
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

export default ViewPost;