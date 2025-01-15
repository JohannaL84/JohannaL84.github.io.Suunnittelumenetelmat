// Määritelläään valmiiksi pari äänestysvaihtoehtoa
let polls = {
    fruits: {
        question: "Suosikki hedelmä",
        options: {
            appelsiini: 0,
            banaani: 0,
            greippi: 0,
            hunajameloni: 0,
            kiivi: 0,
            luumu: 0,
            mango: 0,
            nektariini: 0,
            omena: 0,
            päärynä: 0,
            sitruuna: 0,
            vesimeloni: 0
        }
    },
    seasons: {
        question: "Suosikki vuodenaika",
        options: {
            kevät: 0,
            kesä: 0,
            syksy: 0,
            talvi: 0
        }
    }
};


// Määritellään muuttujien kontekstit
function updateOptions() {
    const pollSelect = document.getElementById('poll');
    const optionSelect = document.getElementById('option');
    const selectedPoll = pollSelect.value;

    // Äänestyksen vaihtoehtojen määritykset
    optionSelect.innerHTML = '';
    for (let option in polls[selectedPoll].options) {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = capitalizeFirstLetter(option);
        optionSelect.appendChild(opt);
    }
}

// Funktio, joka tekee merkkijonon ensimmäisen kirjaimen isolla
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funktio, joka tallentaa käyttäjän tekemän äänen
function submitVote() {
    const poll = document.getElementById('poll').value;
    const option = document.getElementById('option').value;
    polls[poll].options[option]++;
    alert('Ääni rekisteröity!');
}

// Funktio, joka näyttää käyttäjälle äänestystulokset
function showUserResults() {
    const poll = document.getElementById('poll').value;
    const resultsDiv = document.getElementById('user-results');
    let resultsHtml = `<h3>${polls[poll].question}</h3>`;
            
    for (let option in polls[poll].options) {
        resultsHtml += `<p>${capitalizeFirstLetter(option)}: ${polls[poll].options[option]} ääntä</p>`;
    }
    resultsDiv.innerHTML = resultsHtml;
}

// Funktio, joka näyttää ylläpitäjälle äänestystilanteen
function showAdminResults() {
    const resultsDiv = document.getElementById('admin-results');
    let resultsHtml = '';

    for (let poll in polls) {
        resultsHtml += `<h3>${polls[poll].question}</h3>`;
        for (let option in polls[poll].options) {
            resultsHtml += `<p>${capitalizeFirstLetter(option)}: ${polls[poll].options[option]} ääntä</p>`;
        }
    }
    resultsDiv.innerHTML = resultsHtml;
}

// Funktio, joka mahdollistaa ylläpitäjän lisäämään uuden äänestyksen
function addPoll() {
    const newPollName = prompt('Anna uuden äänestyksen nimi:');
    if (newPollName) {
        const newPollOptions = prompt('Anna vaihtoehdot pilkulla erotettuna:'); // Helpottaa käyttäjää lisäämään useamman vaihtoehdon kerralla
        if (newPollOptions) {
            const optionsArray = newPollOptions.split(',');
            let newOptions = {};
            optionsArray.forEach(option => {
                newOptions[option.trim()] = 0;
            });

            polls[newPollName] = {
                question: capitalizeFirstLetter(newPollName),
                options: newOptions
            };

            const pollSelect = document.getElementById('poll');
            const newOption = document.createElement('option');
            newOption.value = newPollName;
            newOption.textContent = capitalizeFirstLetter(newPollName);
            pollSelect.appendChild(newOption);
            alert(`Äänestys "${newPollName}" lisätty.`);
        }
    }
}

// Funktiolla poistetaan äänestys ylläpitäjän toimesta
function removePoll() {
    const removePollName = prompt('Anna poistettavan äänestyksen nimi:'); // Ylläpitäjän tulee tietää, minkä nimistä äänestystä poistaa
    if (removePollName && polls[removePollName] !== undefined) {
        delete polls[removePollName];
        
        const pollSelect = document.getElementById('poll');
        pollSelect.innerHTML = '';
        for (let poll in polls) {
            const opt = document.createElement('option');
            opt.value = poll;
            opt.textContent = capitalizeFirstLetter(poll);
            pollSelect.appendChild(opt);
        }
        
        alert(`Äänestys "${removePollName}" poistettu.`);
    } else {
        alert('Äänestystä ei löydy.');
    }
}

// Päivitetään vaihtoehdot alussa
updateOptions();
