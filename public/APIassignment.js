const key = 'e800fedd6e12442bb09a7aa754a23011';
const secret = 'X0lRjBx8bIQyYdBm8YHzihZ4lng7PlmG';


const displayData = (data) => {
    const  { title, name } = data;
    let hsArea = document.getElementById('hs-area');

    let hsName = document.createElement('li');
    let hsCard = document.createElement('img');

};



// Call the API
// This is a post request, becaues we need the API to generate a new token for us.
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
            for(let i = 0; i < 5; i++){
                let firstFive = data.cards[i];
                console.log(firstFive)
            };

        // log data from the apis
        console.log("Main", data.cards)
    }).then (data => {

        // Taking data and putting it on the screen

    });
}).catch(function(err){

    // Log Any errors
    console.log('something went wrong', err);
});