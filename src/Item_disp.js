import React, { Component } from 'react';
import './item.css';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}
const defaultItem = {
  id : -1,
  name:"Read Error",
  type:"default",
  download:"No File"
}  


class Item_disp extends React.Component{

  concatURL = (url,ref) =>{
    let download; 
    if(url.charAt(0) == '/'){
        download = 'https://wiki.eecs.yorku.ca'+url;
     }else if(url.includes('https')){
        download = url;
     }else if(ref.charAt(ref.length-1)!= '/'){
        let tmp = ref.lastIndexOf('/');
            tmp = ref.substring(0,tmp+1);
            download = tmp + url;
     }else{
        download = ref+url;
     }
     return download;
  }

  render() {
       // console.log(this.props.item);
        return (
          
          <div>
            <div className = "item_display" key={this.props.item.id?this.props.item.id:defaultItem.id}>                
                <span className="itemIcon"><i className={`fas fa-file-${this.props.item.type?this.props.item.type:defaultItem.type}`}></i></span>
                <span className = "name" > {this.props.item.name?this.props.item.name:defaultItem.name}</span>
                <span className = "download" style={styles.fadeIn}><a href = {this.props.item.url?this.concatURL(this.props.item.url,this.props.item.referer):defaultItem.download}  target="_blank" ><i className="fas fa-download" ></i></a></span>
            </div>
          </div> 
        )
    }
}

export default Item_disp;
