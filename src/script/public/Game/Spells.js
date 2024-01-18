// The user can found spells on the field only in Advanture mode based level

// bitboard which represents the board with all spells
let Bitboard_spells = BigInt(0);

// user clicks on the spell icon
AdvantureMode_SpellDisplay.addEventListener('click', () => {
    if (SpellsInStore > 0 && currentPlayer == PlayerData[1].PlayerForm && !PlayerIsAllowedToSetTwoTimes) { // if it is player's turn and he has at least 1 spell in storage
        DisplayPopUp_PopAnimation(UseSpell_PopUp, "flex", true);
    };
});

// other events on pop up
UseSpell_CloseBtn.addEventListener('click', () => {
    UseSpell_PopUp.style.display = "none";
    DarkLayer.style.display = "none";
})

UseSpell_Qbtn.addEventListener('click', () => {
    UseSpell_PopUp.style.display = "none";
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "You have a question?";
});

UseSpell_UseBtn.addEventListener('click', () => {
    UseSpell_PopUp.style.display = "none";
    DarkLayer.style.display = "none";

    SpellsInStore--;
    SpellAmountDisplay.textContent = SpellsInStore;
    PlayerIsAllowedToSetTwoTimes = true;
});

// add spells to the field
const SpellsSpawnRate = () => {
    let spawnRate = 70 - JSON.parse(localStorage.getItem('unlocked_mapLevels'))[current_selected_level][3];
    let numberOfSpells = Math.floor(options.length * (spawnRate / 300));
    console.log("Number of spells: ", numberOfSpells)
    for (let i = 0; i < numberOfSpells; i++) {
        const rndIndex = Math.floor(Math.random() * options.length);
        Bitboard_spells |= (BigInt(1) << BigInt(rndIndex));
    }
    console.log(Bitboard_spells.toString(2));
};

// User found a cell
const UserFoundSpell = (index) => {
    // delete spell on given index
    Bitboard_spells &= ~(BigInt(1) << BigInt(index));
    // add spell to store
    SpellsInStore++;
    setTimeout(() => {
        SpellAmountDisplay.textContent = SpellsInStore;
    }, 1550);
    // spell found animation
    SpellFoundAnimation(index);
};

// animation when user found spell
const SpellFoundAnimation = (index) => {
    // get positions
    let cellPos = cells[index].getBoundingClientRect();
    let destination_position = AdvantureMode_SpellDisplay.getBoundingClientRect();

    // create spell item 
    let img = document.createElement('img');
    img.src = "../public/assets/game/spell.svg";
    img.width = "24";
    img.height = "24";
    img.style.transition = "transform 1s ease-in-out, opacity 1.2s linear";
    img.style.zIndex = "10001"
    img.style.position = "absolute"
    img.style.top = `${cellPos.top}px`;
    img.style.right = `${cellPos.right}px`;
    img.style.left = `${cellPos.left}px`;
    img.style.bottom = `${cellPos.bottom}px`;
    img.style.animation = "1.5s SmallToBigToSmallQuickly ease-in-out"

    setTimeout(() => {
        img.style.transform = `translate(calc(-${(cellPos.right - destination_position.right)}px + 115%), -${cellPos.top - destination_position.top}px)`;

        setTimeout(() => {
            img.style.opacity = "0";
        }, 600);

        setTimeout(() => {
            img.remove();
        }, 1400);
    }, 100);
    document.body.appendChild(img);
};