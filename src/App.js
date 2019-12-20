import React, { Component } from 'react'
import All from './components/all'
import ViewPost from './components/viewPost'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.changeRegions = this.changeRegions.bind(this);
    this.changeID = this.changeID.bind(this);
  }

  
  async componentWillMount() {
    const {setPost, viewPost} = this.props;
    await axios
      .get('http://5df89fcbe9f79e0014b6a4fe.mockapi.io/posts')
      .then(async ({data}) => {
        await setPost(data);
        const local = document.location.href.slice(document.location.href.indexOf('/id/')+4,document.location.href.length);
        const result = data.filter(item => item.id === local);
        viewPost(result[0]);
      });        
      
  }

  changeRegions(ABR) {
    const {setRegions} = this.props;
    setRegions(ABR)
  }

  changeID(id) {
    const {items} = this.props.posts;
    const {viewPost} = this.props;
    const result = items.filter(item => item.id === id);
    viewPost(result[0]);
    
  }


  nameRegions(name) {
    switch (name) {
      case 'DAG': 
        return 'Дагестан';
      case 'ING':
        return 'Ингушетия';
      case 'CHE': 
        return 'Чечня'
    }   
  }

  render() {
    const {post} = this.props.selectPost;
    
    console.log(document.location.href.indexOf('/id/'));
    return (
      <BrowserRouter>
            <Route exact path="/" render={() => <All state={this.props} nameRegions={this.nameRegions} changeRegions={this.changeRegions} changeID={this.changeID}/>} />
            {
              <Route path="/id/" render={() => {
               return !post ? <div className="ui segment">
                          <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading</div>
                          </div>
                          <br /> 
                        </div>  
                : <ViewPost state = {post}/>}}/> 
            }
      </BrowserRouter>
    )
  }
}

const state = (props) => {
  return {
    ...props
  }
}

const action = (dispatch) => ({
  setPost: data => dispatch({
    type: 'SET_POSTS',
    payload: data
  }),
  setRegions: data => dispatch({
    type: 'CHANGE_REGION',
    payload: data
  }),
  viewPost: data => dispatch({
    type: 'CHANGE_ID',
    payload: data
  })
})


export default connect(state, action)(App);