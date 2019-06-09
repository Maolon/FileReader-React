import React, { Component } from 'react'

class Navbar_search extends React.Component{
   
   constructor(props){
       super(props)
       this.state={
           keywords:""
       }
   }

    handleSearch=(e)=>{
        //console.log(e.target.value);
        this.setState({
            keywords:e.target.value
        })
        this.props.getSearch(e.target.value);
    }

    handleSubmit=(e)=>{
        //console.log(this.state.keywords)
        this.props.getSubmit(this.state.keywords);
    }
    
    render(){
        return(
            <div>
                <div>
                    <input onChange={this.handleSearch} className="form-control mr-sm-2"  type="search" placeholder="Search" aria-label="Search"/>
                     <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 bg-secondary text-white border-dark" type="submit">Search</button>
               </div>
            </div>
        )
    }
}

export default Navbar_search;