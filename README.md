# 🚀 Découverte de React

Découverte de React en suivant la [**documentation française**](https://fr.reactjs.org/docs/getting-started.html).
Version de React lors de la découverte : **v16.13.1**.

==> Lien vers [**Glossaire React**](https://fr.reactjs.org/docs/glossary.html)

## Sommaire
1. [**Objectifs**](#objectifs)
2. [**Introduction**](#introduction)

## Objectifs
Les objectifs à la suite de la découverte de la documentation vont être simple : 
* Créer une petite application React pour se faire la main sur l'outil ([**tutoriel pratique de React : construction d'un morpion**](https://fr.reactjs.org/tutorial/tutorial.html))
* Créer un stater webpack avec React (pour mise en place de la compilation, du HMR etc)
* ? potentiellement créer un projet un peu plus consistant avec React afin de le mettre en avant sur le portfolio

## Introduction
**React** est une bibliothèque JavaScript pour la construction d'interface utilisateur (UI).
A quoi sert React ? Qu'est ce que c'est ? Comment cela fonctionne ? 

React est une bibliothèque **déclarative**, grâce à laquelle il est simple de créer des UI intéractives.  
Avec React nous devons définir des vues simples pour chacun des états possible de notre application, ainsi lorsque les données 
évolueront, React se chargera de mettre à jour, de façon optimale, les composants impactés par cette évolution.  
Les **vues déclaratives** rendent le code plus simple à analyser en vue d'un potentiel débogage. 

React est basé autour de la création de **composants**.  
Ces composants devront être autonomes et ainsi maintenir leur propre état. En les assemblant nous pourrons alors obtenir une UI 
complexe.  
Ces composants étant écrit en JavaScript, et non sous la forme d'un simple template HTML, nous pourrons facilement utiliser des données
complexes pour les irriguer et maintenir l'état de ceux-ci hors du DOM. 

React est globalement une solution utilisable partout, que ce soit client-side ou server-side et même sur des applications mobiles, grace à 
[React Native](https://react-native.dev/).

Tous les composants React devront implémenter une méthode **render()** qui prend des données en entrées et retourne ce qui doit être affiché 
lorsque le composant est appelé.  
Les données passées au composant sont accessible dans la méthode render() via **this.props**.

```
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Salut {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Thierry" />,
  document.getElementById('hello-example')
);
```

De plus, les composants React peuvent maintenir un **état local**, qui sera accessible via **this.state**.  
Lorsque cet état varie la méthode render() est systématiquement appelée, l'affichage du composant est alors automatiquement mis à jour. 

```
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Secondes : {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);
```