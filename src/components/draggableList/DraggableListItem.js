import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/Inbox';
import TaskIcon from '@mui/icons-material/Task';
import { Checkbox, ListItemIcon } from '@mui/material';
// import { Item } from '../typings';

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)'
  }
});

// export type DraggableListItemProps = {
//   item: Item;
//   index: number;
// };

const DraggableListItem = (props) => {
  const classes = useStyles();
  console.log("draggableId")
  console.log(props.item.id)

  return (
    <Draggable draggableId={`${props.item.id+1}`} index={props.index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
          // button
          onClick={props.handleToggle(props.item)}
        >
          <ListItemIcon>
            <Checkbox
              checked={props.checked}
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': props.labelId,
              }}
            />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar sx={{
                        bgcolor: 'primary.main',
                      }}>
              <TaskIcon  />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${props.item.id} : ${props.item.title}`} secondary={props.item.description.substring(0,20)} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
