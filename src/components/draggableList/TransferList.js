import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Avatar, ListItemAvatar } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const [checked, setChecked] = React.useState([]);
  
  console.log(props.choosedItems)
  const [left, setLeft] = React.useState(props.items);
  let right = props.choosedItems
  const setRight = props.setChoosedItems//React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
//   const rightChecked=[]
  //verifica se o componente esta com checked, se tiver, remove, se nao tiver, inclui
  const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    const currentIndex = checked.map(e => e.id).indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //envia elemos da esquerda pra direita
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  //pega os elementos selecionados da esquerda e envia para direita
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  //pega os elementos selecionados da direita e envia para esquerda
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  //envia todos os elementos pa a esquerda
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  // Cria a lista e os seus elementos
  const customList = (items,onDragEnd) => (
    <Paper sx={{ width: 300, height: 230, overflow: 'auto' }}>

        <DragDropContext onDragEnd={onDragEnd!==null?onDragEnd:()=>{}}>
            <Droppable droppableId="droppable-list">
                {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                        <DraggableListItem handleToggle= {handleToggle}
                        item= {item}
                        key={item.id}
                        index={index}
                        checked={checked.indexOf(item) !== -1}
                        labelId={item.id}
                        
                        />
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
      {/* <List dense component="div" role="list">
        
      {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item,index) => {
                    const labelId = `transfer-list-item-${item}-label`;

                    return (
                        // <></>
                        <DraggableListItem handleToggle= {handleToggle}
                                        item= {item}
                                        key={item.id}
                                        index={index}
                                        checked={checked.indexOf(item) !== -1}
                                        labelId={labelId}
                                        
                                        />
                                        )
                                        })}
                
                </div> 
        )}
        {/*     <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
              
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
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
              <ListItemText id={labelId} 
                            primary={`List item giganteeeeeeADad asd asd asdasd  assssssdasdaasdsd asd asdas asd ${value + 1}`}
                             />
            </ListItem>
          );
        })}
        <ListItem /> 
        
      </List> */}
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right,props.onDragEnd)}</Grid>
    </Grid>
  );
}
