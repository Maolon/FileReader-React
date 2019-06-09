import React from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './Item';
import Navbar from './Navbar';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        isSearch:false,
        submit:""
    }
  }
  getSubmit=(w)=>{
    console.log(w);
    this.setState({
       submit:w
    })
  }

  getSearch=(w)=>{
    console.log(w.trim().split(" "));
    this.setState({
       isSearch:w==null||w.trim().split(" ")==""?false:true
     })
  }

  render(){
    //console.log(this.state.isSearch); 
  return (
    
    <div className="App">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"></link>
    <Navbar getSearch={this.getSearch} getSubmit={this.getSubmit}/>
    <Item className="list container-fluid" search={this.state.isSearch} submit={this.state.submit}/>
    </div>
  );
  }
}

export default App;
