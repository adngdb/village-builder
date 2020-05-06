import army from '../stores/army';
import demons from '../stores/demons';
import food from '../stores/food';
import gameOver from '../stores/gameOver';
import screen from '../stores/screen';
import turn from '../stores/turn';
import worldMap from '../stores/worldMap';


export default function restart() {
    army.reset();
    demons.reset();
    food.reset();
    gameOver.reset();
    screen.reset();
    turn.reset();
    worldMap.reset();
}
