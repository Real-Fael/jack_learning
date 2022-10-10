import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/Inbox';
import TaskIcon from '@mui/icons-material/Task';
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
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemAvatar>
            <Avatar sx={{
                        bgcolor: 'primary.main',
                      }}>
              <TaskIcon  />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.item.primary} secondary={props.item.secondary} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
