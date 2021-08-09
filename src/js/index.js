'use strict';

// Découverte de JSX
function formatName(u) {
    return u.firstName + ' ' + u.lastName;
}

const user = {
    'firstName': 'Wilfried',
    'lastName': 'Jumelle'
};

const element = (
    <h1>
        Bonjour, {formatName(user)} !
    </h1>
);

ReactDOM.render(
  element,
  document.getElementById('app')
);

// Découverte et manipulation des éléments React
function tick() {
    const element = (
        <div>
        <h1>Bonjour, monde !</h1>
        <h2>Il est {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('app'));
}
  
setInterval(tick, 1000);