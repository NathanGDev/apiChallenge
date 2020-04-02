const key = 'e800fedd6e12442bb09a7aa754a23011';
const secret = 'X0lRjBx8bIQyYdBm8YHzihZ4lng7PlmG';

const displayData = (myCard) => {
    const  { name, text, image, health, attack, manaCost } = myCard;
    let hsArea = document.getElementById('hs-area');

    let hsCards = document.createElement('div');
    hsCards.classList.add('hsCards');

        const createHsCard = (hsFinal) => {
            console.log(hsFinal)
            let hsCard = document.createElement('div');
            hsCard.classList.add('hsCard')
            let hsName = document.createElement('h2');
            hsName.classList.add('hsName');
            let hsAbility = document.createElement ('p');
            hsAbility.classList.add('hsAbility');
            let hsHealth = document.createElement ('p');
            hsHealth.classList.add('hsHealth');
            let hsAttack = document.createElement ('p');
            hsAttack.classList.add('hsAttack');
            let hsManaCost = document.createElement ('p');
            hsManaCost.classList.add('hsManaCost');
            let hsImg = document.createElement('img');
            hsName.innerHTML = hsFinal.name.en_US;
            hsAbility.innerHTML = hsFinal.text.en_US;
            hsHealth.innerHTML = hsFinal.health;
            hsAttack.innerHTML = hsFinal.attack;
            hsManaCost.innerHTML = hsFinal.manaCost;
            hsImg.src = hsFinal.image.en_US;

            hsCard.appendChild(hsName);
            hsCard.appendChild(hsAbility);
            hsCard.appendChild(hsHealth);
            hsCard.appendChild(hsAttack);
            hsCard.appendChild(hsManaCost);
            hsCard.appendChild(hsImg);
            hsCards.appendChild(hsCard);

            console.log("================================")
        }
        createHsCard({ name, text, image, health, attack, manaCost})
        hsArea.appendChild(hsCards);
};



// Call the API
// This is a post request, becaues we need the API to generate a new token for us.
function call() {
    fetch('https://us.battle.net/oauth/token',{
        method: 'POST',
        body:'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(resp) {

        // Return the response as a JSON
        return resp.json();
    }) .then (function(data) {

        //Log the API Data
        console.log('token', data);

        //Return a second API call
        //This one uses the token we received for authentication
        let responsePromise = fetch('https://us.api.blizzard.com/hearthstone/cards', {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then (function(resp){

            // return the API response as Json
            return resp.json();
        }).then (function (data){
            // log data from the apis
            let card = data.cards;
            let hsInfo = [];
            for (let i = 0; i < 5;i++){
                let myCard = card[Math.floor(Math.random() * card.length)];
                displayData(myCard)
            }
            //  let myHs = {
            //     name: hsInfo.name.en_us,
            //     text: hsCardInfo.text,
            //     image: hsCardInfo.image,
            //     health: hsCardInfo.health,
            //     attack: hsCardInfo.attack,
            //     manaCost: hsCardInfo.manaCost,
            // };
            //
            // console.log(myHs);


        });
    }).catch(function(err){

        // Log Any errors
        console.log('something went wrong', err);
    });
}
