import army from '../stores/army';
import demons from '../stores/demons';
import gameOver from '../stores/gameOver';
import resources from '../stores/resources';
import turn from '../stores/turn';
import worldMap from '../stores/worldMap';


export default function restart() {
    army.reset();
    demons.reset();
    gameOver.reset();
    resources.reset();
    turn.reset();
    worldMap.reset();
}
