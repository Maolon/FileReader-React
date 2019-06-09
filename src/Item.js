import React, { Component } from 'react';
import Item_directory from './Item_directory';
import Search from './search';
import './item.css';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';

const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

const testItems = {
    "0": {
      code: null,
      id: 1,
      name: "square.cc",
      referer: "https://www.eecs.yorku.ca/course_archive/1995-96/cpp/cppPuzzles/square.cc",
      season: null,
      status: 3,
      type: "cc",
      url: "https://www.eecs.yorku.ca/course_archive/1995-96/cpp/cppPuzzles/square.cc",
      year: "UNKNOW"
        }
  }

  var t0; var t1; 

class Item extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            items:[],
            orgItems:[],
            searchItems:[],
            isReady:false,
            isError:false
        }
        
        this.getFiles();
      }
      
      //https://files.mai1015.com/api/search/item/
      getFiles=()=>{
       
        let myHeaders = new Headers();
        let options={
          method:'GET',
          headers:myHeaders,
          mode:'cors',
          cache: 'default'
        }
        t0 = performance.now();
        fetch('https://files.mai1015.com/api/item?c=100',options)
        .then(resp=>resp)
        .then(data=>data.json())
        .then((data)=>{ 
          t1 = performance.now();
          console.log("performance fetch"+(t1-t0)/1000);       
          this.setState({
             orgItems:data.data
          })  
         
          return this.organizeData(data);       
         }).then((data)=>{ 
         
          data.sort(function(a, b){
            if(a == null) a = -1;
            if(b == null) b = -1
            return  parseInt(a.name, 10)- parseInt(b.name, 10);
          });   
          
          t1 = performance.now();
           console.log("performance data prepare"+(t1-t0)/1000); 
           this.setState({
              items:data,
              isReady:true
           })
           t1 = performance.now();
           console.log("performance whole"+(t1-t0)/1000); 
          }
       ).catch((e)=>{
          console.log(e);
          this.setState({
            isError:true
         });
         
        })
        
      }     

      organizeData=(data)=>{
        var curData = data.data;
        var newData = [];
        for(var i=0;i<curData.length;i++){
          var code = this.isItemOf(newData,'name',curData[i].code);
          if(code!=-1){
               var year = this.isItemOf(newData[code].children,'name',curData[i].year);
               if(year != -1){
                  var season = this.isItemOf(newData[code].children[year].children,'name',curData[i].season);
                  if(season != -1){
                       let tmp = {
                        name:curData[i].id,
                        type:"item",
                        data:curData[i]
                      } 
                      newData[code].children[year].children[season].children.push(tmp);
                     
                  }else{
                     let tmp = {
                      name:curData[i].season,
                      type:"dir",
                      children:[
                        {
                          name:curData[i].id,
                          type:"item",
                          data:curData[i]
                        } 
                      ]
                    }
                    newData[code].children[year].children.push(tmp);
                  }
               }else{
                  let tmp = {
                    name:curData[i].year,
                    type:"dir",
                    children:[
                       {
                         name:curData[i].season,
                         type:"dir",
                         children:[
                           {
                             name:curData[i].id,
                             type:"item",
                             data:curData[i]
                           } 
                         ]
                       }
                    ]
                  }
                  newData[code].children.push(tmp);
               }
           }else{
              let tmp = {
                name:curData[i].code,
                type:"dir",
                children:[
                  {
                    name:curData[i].year,
                    type:"dir",
                    children:[
                       {
                         name:curData[i].season,
                         type:"dir",
                         children:[
                           {
                             name:curData[i].id,
                             type:"item",
                             data:curData[i]
                           } 
                         ]
                       }
                    ]
                  }

                ]
              }
              newData.push(tmp);
           }
        }
        return newData;
      }

      handleSearch=()=>{
        console.log("im in")
         this.normalSearch(this.state.orgItems,this.props.submit)
      }

      // isItemOf=(arr,type,key)=>{
      //   if(arr == null) return -1;
      //   for(let i=0;i<arr.length;i++){
      //    var x =  arr[i]
      //     //console.log(x); 
      //     if(x[`${type}`] == key) return i;
      //   }
      //   return -1;
      // }

      isItemOf=(arr,type,key)=>{
        return  arr.findIndex(p => p[`${type}`] == key);
      }


      isReady=()=>{
        if(!this.state.isError){
          if(this.state.isReady){
            if(!this.props.search){
            return(
                <div style={styles.fadeIn}>
                  {this.state.items.map((items)=><Item_directory item = {items} render={true} key={items.name}/>)}            
                </div>
              )
            }else{
               return(
                <div style={styles.fadeIn}>
                  {this.handleSearch()}
                </div>
               )
            }
         }else{
            return(
              <div>
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div style={styles.fadeIn}>
                <div>File Reader Loading</div>
                <div>Please Wait</div>
              </div>
              </div>
             
            )
         }
        }else{
          return(
            <div>
            <i class="fas fa-exclamation-circle"></i>
            <div>Connecting Error</div>
            </div>
          )
        }
        
      }

      render() {
        console.log(this.props.search);
        
        return (
        
          <div>
           <StyleRoot>
            {/* {this.state.items.map((items)=><Item_directory item = {items} />)} */}
            <h1>FILE</h1>
            <h1>READER</h1>
            {this.isReady()}
            </StyleRoot>
          </div>
        );
    }
    
}

export default Item;
