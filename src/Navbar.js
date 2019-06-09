import Navbar_search from './Navbar_search';
import React, { Component } from 'react';

class Navbar extends React.Component{
    render() {
        return (
          <div>
            <nav className="navbar navbar-dark bg-dark">
                
                <Navbar_search getSearch={this.props.getSearch} getSubmit={this.props.getSubmit}/>
  
            </nav>


          </div>
        );
    }
}

export default Navbar;