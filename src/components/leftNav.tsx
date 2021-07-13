import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import Logos from '../images/logos.jpg'
import Melon from '../images/melon.png'
import Swiss from '../images/swissLogo.png'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props:any) {
  const classes = useStyles();
  const [state, setState] = React.useState(props.open);

  const toggleDrawer = (open:boolean) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setOpen(open)
    setState(open);
  };

  const list = (anchor:any) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Дома', 'Play Memory Game', 'Ride a road map'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index === 0 ? <HomeIcon /> : <SportsEsportsIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['За Вело Училишта'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={props.open} onClose={toggleDrawer(false)}>
            {list("left")}
            {
              [1, 2, 3, 4, 5, 6, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, ].map(() => {
                return <br />
              })
            }
            <Divider />
            <div className="sponsors">
              <img src={Logos} alt="ecologic"></img>
            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}