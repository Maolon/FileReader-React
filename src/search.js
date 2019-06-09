import React, { Component } from 'react';

class Search extends React.Component {
    
    normalSearch=(items,keys)=>{
        const simi = 0.7;
        let keyArr=keys.trim().split(/\s+/);
        console.log(keyArr);
    }
    
    fuzzyCompare=(s,t)=>{
        let sSet = new Set();
        let tSet = new Set();
     
        let sArr = s.split("");
        let tArr = t.split("");
        let hit = 0;
        
        for(let i=0;i<sArr.length;i++){
           let str = sArr[i];
           if(sArr[i+1]!= null){
               str += sArr[i+1];
           }
           sSet.add(str);
        }
     
        for(let i=0;i<tArr.length;i++){
            let str = tArr[i];
            if(tArr[i+1] != null){
                str += tArr[i+1];
            }
           tSet.add(str);
        }
        
        for(let item of sSet){
            if(tSet.has(item)) hit++;
        }
        
        let size = sSet.size + tSet.size;
        let correlate = size - 2*hit; 
        let normal = correlate/size;
        
        return normal; 
    }
}