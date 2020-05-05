import army from '../stores/army';
import demons from '../stores/demons';
import gameOver from '../stores/gameOver';
import resources from '../stores/resources';
import turn from '../stores/turn';
import villageMap from '../stores/villageMap';


export default function restart() {
    army.reset();
    demons.reset();
    gameOver.reset();
    resources.reset();
    turn.reset();
    villageMap.reset();
}
