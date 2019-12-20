import React, { Component } from 'react';
import '../App.css';
import Post from '../components/post';



class All extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    
    const {posts, regions} = this.props.state;
    const {items} = posts;
    const {reg} = regions;

    console.log();

    const filterItem = items.filter(item => item.regions === reg)
    return (
        <div>
          <h3>Ваш регион: {this.props.nameRegions(reg)}</h3>
        <div className="ui basic buttons">
            <div className="ui button" onClick={() => this.props.changeRegions("DAG")}>Дагестан</div>
            <div className="ui button" onClick={() => this.props.changeRegions("ING")}>Ингушетия</div>
            <div className="ui button" onClick={() => this.props.changeRegions("CHE")}>Чечня</div>
        </div>
        <div className="ui divider"></div>

        {
          !items.length ? <div className="ui segment">
                            <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading</div>
                            </div>
                            <br /> 
                       
                          </div> 
          : filterItem.map((post, key) => <Post key={key} 
                                                title={post.title} 
                                                description={post.description} 
                                                image={post.image} 
                                                view={post.view} 
                                                regions={post.regions} 
                                                id={post.id}
                                                changeID={this.props.changeID}
                                                />)
          
        }
        
    </div>
  );
  }
}



export default All;
