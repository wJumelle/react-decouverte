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

// Découverte de l'affichage conditionnel
function SalutLabo(props) {
    return (
        <h2>Salut très cher abonné</h2>
    )
}

function SalutLunknow(props) {
    return (
        <h2>Salut abonne-toi, merci !</h2>
    )
}

function MessageDeBienvenue(props) {
    const isLoggedIn = props.isLoggedIn; 

    if(isLoggedIn) {
        return (
            <SalutLabo />
        )
    } else {
        return (
            <SalutLunknow />
        )
    }
    // return (
    //     <div>{isLoggedIn ? <SalutLabo /> : <SalutLunknow />}</div>
    // )
}

ReactDOM.render(
    <MessageDeBienvenue isLoggedIn={true} />,
    document.getElementById('app-affichageConditionnel')
);

// Approfondissement de l'affichage conditionnel - récupération des éléments dans des variables
// On reprends les deux composants SalutLabo / SalutLunknow du dessus
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Connexion
        </button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Déconnexion
        </button>
    )
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render () {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if(isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }

        return (
            <div>
                <MessageDeBienvenue isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

ReactDOM.render(
    <LoginControl />, 
    document.getElementById("app-affichageConditionnel2")
)

// Affichage conditionnel - Masquer avec la valeur null !
function ChantalLauby(props) {
    const isVisible = props.isVisible;
    if(!isVisible) {
        return null;
    }

    return (
        <div style={{position: "relative", paddingBottom: "calc(57.50% + 44px)"}}>
            <iframe src='https://gfycat.com/ifr/FixedIllegalCod' frameBorder='0' scrolling='no' width='100%' height='100%' style={{position: "absolute", top: 0, left: 0}} allowFullScreen></iframe>
        </div>
    );
}

function ButtonSwitchChantalLauby(props) {
    const isVisible = props.isVisible;

    return (
        <button onClick={props.onClick}>{isVisible ? "On m'voit plus" : "On m'voit"}</button>
    )
}

class OnmvoitOnmvoitplus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: this.props.isVisible};
        this.handleSwitchChantalLaubyClick = this.handleSwitchChantalLaubyClick.bind(this);
    }

    handleSwitchChantalLaubyClick() {
        this.setState(state => ({visible: !state.visible}));
    }

    render() {
        return (
            <div>
                <h2>Mesdames et Messieurs, Chantal Lauby 🎉</h2>
                <ButtonSwitchChantalLauby isVisible={this.state.visible} onClick={this.handleSwitchChantalLaubyClick} />
                <ChantalLauby isVisible={this.state.visible} />
            </div>
        )
    }
}

ReactDOM.render(
    <OnmvoitOnmvoitplus isVisible={false} />,
    document.getElementById('app-chantalLauby')
);

// Découverte des listes et clés
function NumberList(props) {
    const numbers = props.numbers; 
    const listItems = numbers.map( (number) => <li>{number}</li> );

    return (
        <ul className="NumberList">{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5]; 

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('app-introMap')
)
