import army from '../stores/army';
import attackCamp from '../stores/attackCamp';
import demons from '../stores/demons';
import food from '../stores/food';
import gameOver from '../stores/gameOver';
import screen from '../stores/screen';
import turn from '../stores/turn';
import worldMap from '../stores/worldMap';


export default function restart() {
    army.reset();
    attackCamp.reset();
    demons.reset();
    food.reset();
    gameOver.reset();
    screen.reset();
    turn.reset();
    worldMap.reset();
}
