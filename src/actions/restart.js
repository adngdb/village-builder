import army from '../stores/army';
import attackCamp from '../stores/attackCamp';
import food from '../stores/food';
import gameOver from '../stores/gameOver';
import screen from '../stores/screen';
import turn from '../stores/turn';
import wave from '../stores/wave';
import worldMap from '../stores/worldMap';


export default function restart() {
    army.reset();
    attackCamp.reset();
    wave.reset();
    food.reset();
    gameOver.reset();
    screen.reset();
    turn.reset();
    worldMap.reset();
}
