import army from '../stores/army';
import attackCamp from '../stores/attackCamp';
import food from '../stores/food';
import gameOver from '../stores/gameOver';
import screen from '../stores/screen';
import turn from '../stores/turn';
import villageNames from '../stores/villageNames';
import wave from '../stores/wave';
import worldMap from '../stores/worldMap';


export default function restart() {
    army.reset();
    attackCamp.reset();
    food.reset();
    gameOver.reset();
    screen.reset();
    turn.reset();
    villageNames.reset();
    wave.reset();
    worldMap.reset();
}
