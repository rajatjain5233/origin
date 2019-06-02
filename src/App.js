import React , {Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';

import AddCircle from "@material-ui/icons/AddCircle";

import RemoveCircle from "@material-ui/icons/RemoveCircle";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import Person from "@material-ui/icons/Person";

import MeetingRoom from "@material-ui/icons/MeetingRoom";
import { Typography } from '@material-ui/core';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class App extends Component{
  state = {
    roomCount:1,
    adultCount:1,
    childCount:0 
  }
  onAction=(action)=>{
    if(action=="roomsAddAction"&&this.state.roomCount>=1&&this.state.roomCount<5){
        var adultCount = this.state.adultCount;
        var childCount =this.state.childCount;
        var roomCount =this.state.roomCount;
        if(adultCount+childCount<(roomCount+1)){
            adultCount=adultCount+1;   
        }
        this.setState({
          roomCount:this.state.roomCount+1,
          adultCount:adultCount
        });
         
    }
    if(action=="roomsSubAction"&&this.state.roomCount>1&&this.state.roomCount<=5){
        var adultCount=this.state.adultCount;
        var childCount=this.state.childCount;
        var roomCount = this.state.roomCount;
        if(this.state.adultCount+this.state.childCount>(4*(roomCount-1))){
          
          var people_to_remove=((adultCount+childCount)-4*(roomCount-1));
         
          if((this.state.childCount-people_to_remove)>0){
             childCount=this.state.childCount-people_to_remove;
          }else{
            childCount=0;
            adultCount= this.state.adultCount+(this.state.childCount-people_to_remove);
          }
        }
        this.setState({
          roomCount:this.state.roomCount-1,
          childCount:childCount,
          adultCount:adultCount
        });
    }
    if(action=="adultsAddAction"&&(this.state.adultCount+this.state.childCount)<20){
      var adultCount = this.state.adultCount;
      var childCount = this.state.childCount;
      var roomCount  = this.state.roomCount;
      if((adultCount+childCount+1)>(4*roomCount)){
        roomCount=roomCount+1;
      }
      this.setState({
        roomCount:roomCount,
        adultCount:(adultCount)+1
      });
    }
    if(action=="adultsSubAction"&&(this.state.adultCount+this.state.childCount)>1&&(this.state.adultCount-1>1)){
      var adultCount = this.state.adultCount;
      var childCount = this.state.childCount;
      var roomCount  = this.state.roomCount;
      if((adultCount+childCount-1)<=(4*(roomCount-1))){
        roomCount=roomCount-1;
      }
      this.setState({
        adultCount:adultCount-1,
        roomCount:roomCount
      });
    }
    if(action=="childsAddAction"&&(this.state.adultCount+this.state.childCount)<20){
      var adultCount = this.state.adultCount;
      var childCount = this.state.childCount;
      var roomCount  = this.state.roomCount;
      if((adultCount+childCount+1)>(4*roomCount)){
        roomCount=roomCount+1;
      }
      this.setState({
        roomCount:roomCount,
        childCount:(childCount)+1
      });
    }
    if(action=="childsSubAction"&&(this.state.adultCount+this.state.childCount)>1){
      var adultCount = this.state.adultCount;
      var childCount = this.state.childCount;
      var roomCount  = this.state.roomCount;
      if((adultCount+childCount-1)<=(4*(roomCount-1))){
        roomCount=roomCount-1;
      }
      this.setState({
        childCount:childCount-1,
        roomCount:roomCount
      });
    }
  }
  render (){
    const { classes } = this.props;
    var adultsubdisabled=(this.state.adultCount<=1);//(this.state.adultCount+this.state.childCount)<=1&&
    var childadddisabled=(this.state.adultCount+this.state.childCount)>=20;
    var childsubdisabled=(this.state.childCount<=0);//(this.state.adultCount+this.state.childCount)<=1&&
    return (
      <div className="App">
            <Typography variant="h6">Choose the no of people</Typography>
            <Box className="Box-class" border={1}>
               
              <Grid container spacing={3}>
                  <Grid item xs={4} style={{color: "blue"}}>
                    <MeetingRoom/>
                    Rooms
                  </Grid>
                  <Grid item xs={5}>
                    
                  </Grid>
                  
                  
                  <Grid  item xs={1}>
                      <RemoveCircle onClick={(event)=>this.onAction("roomsSubAction")} color={this.state.roomCount<=1?"disabled":"primary"}/>
                  </Grid>
                  <Grid item xs={1}>
                    {this.state.roomCount}
                  </Grid> 
                  <Grid  item xs={1}>
                      <AddCircle onClick={(event)=>this.onAction("roomsAddAction")} color={this.state.roomCount>=5?"disabled":"primary"}/>
                  </Grid>
                   
                  <Grid item xs={4} style={{color: "blue"}}>
                    <Person/>
                    Adults
                  </Grid>
                  <Grid item xs={5}>
                    
                  </Grid>
                  
                  <Grid  item xs={1}>
                      <RemoveCircle onClick={(event)=>this.onAction("adultsSubAction")} color={adultsubdisabled?"disabled":"primary"}/>
                  </Grid>
                  <Grid item xs={1}>
                    {this.state.adultCount}
                  </Grid> 
                  <Grid  item xs={1}>
                      <AddCircle onClick={(event)=>this.onAction("adultsAddAction")} color={(this.state.adultCount+this.state.childCount)>=20?"disabled":"primary"} />
                  </Grid>
                   


                  <Grid item xs={4} style={{color: "blue"}}>
                  <AccessibilityNew/>
                    Children
                  </Grid>
                  <Grid item xs={5}>
                    
                  </Grid>
                 
                  <Grid  item xs={1}>
                      <RemoveCircle onClick={(event)=>this.onAction("childsSubAction")} color={childsubdisabled?"disabled":"primary"}/>
                  </Grid>
                  
                  <Grid item xs={1}>
                    {this.state.childCount}
                  </Grid>  
                  <Grid  item xs={1}>
                      <AddCircle onClick={(event)=>this.onAction("childsAddAction")} color={childadddisabled?"disabled":"primary"}/>
                  </Grid>
              </Grid>
                
              
            </Box>
      </div>
    );
  } 
}

// export default App;
export default withStyles(styles)(App);