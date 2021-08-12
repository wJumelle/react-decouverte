'use strict';

// Découverte de JSX
function formatName(u) {
    return u.firstName + ' ' + u.lastName;
}

const user = {
    'firstName': 'Wilfried',
    'lastName': 'Jumelle'
};

const elemJSX = (
    <h1>
        Bonjour, {formatName(user)} !
    </h1>
);

ReactDOM.render(
  elemJSX,
  document.getElementById('app-jsx')
);

// Découverte et manipulation des éléments React
function tick() {
    const element = (
        <div>
        <h1>Bonjour, monde !</h1>
        <h2>Il est {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('app-elements'));
}

tick();
setInterval(tick, 1000);

// Découverte et manipulation des composants React et des props
function Welcome(props) {
    return <h1>Bonjour, {props.name}</h1>;
}

const elemComposants = <Welcome name="Wilfried" />;
ReactDOM.render(
    elemComposants,
    document.getElementById('app-composants')
);

// Création d'un composant englobant l'application
function Welcome(props) {
    return <h1>Bonjour, {props.name} !</h1>
}

function App() {
    return (
        <div>
            <Welcome name="Wilfried" />
            <Welcome name="Elodie" />
            <Welcome name="Gwendoline" />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app-composantsApp')
);

// Découverte des états et cycle de vie
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() }
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => {
                this.setState({ date: new Date() })
            }, 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
        <div>
            <h1>États et cycle de vie - format class cycle de vie</h1>
            <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('app-etatsCycle')
);

// Découverte des gestionnaires d'événements React
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true }

        //On réalise une liaison entre la méthode et le mot-clé this
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }))
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('app-eventsClass')
)