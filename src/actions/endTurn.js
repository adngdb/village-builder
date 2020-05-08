import { get } from 'svelte/store';

import BUILDINGS from '../data/buildings';
import SOLDIERS from '../data/soldiers';

import army from '../stores/army';
import attackCamp from '../stores/attackCamp';
import food from '../stores/food';
import gameOver from '../stores/gameOver';
import turn from '../stores/turn';
import screen from '../stores/screen';
import villageMap from '../stores/villageMap';
import wave from '../stores/wave';
import worldMap from '../stores/worldMap';


function produceResources() {
    worldMap.getHumanVillages().forEach(village => {
        const buildings = get(village.map).flat()
            .filter(t => t !== villageMap.EMPTY_TILE)
            .filter(t => t.building && t.level > 0)
            .filter(
                t => BUILDINGS[t.building].category === BUILDINGS.CATEGORIES.PRODUCTION
            );

        buildings.forEach(tile => {
            const output = BUILDINGS[tile.building].output[tile.level];
            for (const resource in output) {
                if (resource === 'food') {
                    food.gain(output[resource]);
                }
                else {
                    village.resources.gain(resource, output[resource]);
                }
            }
        });
    });
}


function eatFood() {
    const foodToEat = army.getFoodIntake();

    if (foodToEat > get(food)) {
        // There's not enough food, some soldiers will die.
        army.starvation();
    }
    else {
        army.belliesFilled();
    }

    food.lose(foodToEat);
}


function build() {
    worldMap.getHumanVillages().forEach(village => {
        village.map.build();
    });
}


function recruitSoldiers() {
    let soldiers = [];
    worldMap.getHumanVillages().forEach(village => {
        soldiers = soldiers.concat(village.map.recruit());
    });
    army.recruit(soldiers);
}


function waveAttack() {
    if (wave.areAttackingThisTurn()) {
        // Compute army's strength.
        const armyStrength = army.getStrength();
        const demonsStrength = get(wave).strength;

        if (armyStrength > demonsStrength * 1.2) {
            // Glorious victory, no losses.
            console.debug('glory!');
        }
        else if (armyStrength < demonsStrength * 0.8) {
            // Dramatic loss, game over.
            gameOver.lose();
        }
        else {
            // Draw, your army takes some losses.
            const combatResult = ( demonsStrength * 1.2 ) - armyStrength;
            const percent = combatResult / armyStrength * 100;
            army.loseSoldiers(percent);
        }
    }
}


function campAttack() {
    const camp = get(attackCamp);

    // Compute army's strength.
    const armyStrength = army.getStrength();
    const campStrength = get(worldMap).flat()[camp].strength;

    if (armyStrength < campStrength * 1.1) {
        // Dramatic loss, game over.
        gameOver.lose();
    }
    else {
        if (worldMap.getTile(camp).type === 'boss') {
            // You've beaten the boss! It's glorious victory!
            gameOver.win();
        }
        else {
            // Win, but you're losing troops anyway.
            // Heh, you get a new village in the deal, don't complain!
            const combatResult = armyStrength - campStrength
            const percent = ( armyStrength / combatResult * 5 ) - 5
            army.loseSoldiers(percent);

            worldMap.claimVillage(camp);
            attackCamp.reset();

            // Refresh next wave attack.
            wave.startNewWave();

            screen.goToVillage();
        }
    }
}


function resolveAttack() {
    if (get(attackCamp) !== null) {
        campAttack();
    }
    else {
        waveAttack();
    }
}


export default function endTurn() {
    produceResources();
    eatFood();
    build();
    recruitSoldiers();
    resolveAttack();
    turn.next();
}
