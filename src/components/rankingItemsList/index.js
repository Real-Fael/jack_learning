import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';




export default function RankingItemsList(props) {

  let MyIcon = <></>
  if (props.hasOwnProperty("index") && props.index===0)
    MyIcon = <img alt='postion1' src={require("./../../data/position1.png")} height={40} />
  if (props.hasOwnProperty("index")  && props.index===1)
    MyIcon = <img alt='postion2' src={require("./../../data/position2.png")} height={40} />
  if (props.hasOwnProperty("index")  && props.index===2)
    MyIcon = <img alt='postion3' src={require("./../../data/position3.png")} height={40} />


  return (
      <ListItem key={`${props.myKey}-${props.index}`}>
        <ListItemAvatar>
            {MyIcon}
        </ListItemAvatar>
        <ListItemText primary={props.primary? props.primary:""} secondary={props.secondary? props.secondary:""} />
      </ListItem>
      
    
  );
}