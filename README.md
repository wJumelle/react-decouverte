# 🚀 Découverte de React

Découverte de React en suivant la [**documentation française**](https://fr.reactjs.org/docs/getting-started.html).
Version de React lors de la découverte : **v16.13.1**.

==> Lien vers [**Glossaire React**](https://fr.reactjs.org/docs/glossary.html)

## Sommaire
1. [**Objectifs**](#objectifs)
2. [**Introduction**](#introduction)
3. Guide étape par étape : [**Introduction à JSX**](#introduction-a-jsx)

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

## Introduction à JSX
```
const element = <h1>Bonjour, monde !</h1>;
```

Cette syntaxe n'est ni une chaîne de caractère ni du HTML à proprement parlé.  
C'est ce que l'on appelle du **JSX**, et c'est une **extension syntaxique de JavaScript**.  
Elle permet de décrire à quoi doit ressembler un élément de l'interface utilisateur (UI). Cela ressemble à un language de balisage 
standard, mais il renferme toute la puissance du JavaScript !

JSX va produire des **éléments React** qui pourront être retranscrit dans le DOM.

### Pourquoi le choix du JSX ?
Une interface utilisateur a toujours conditionnée les **logiques de rendu**, les **logiques de la gestion des événements** à la préparation 
des données pour l'affichage, en passant par **l'évolution de l'état au fil du temps**.   

React a choisi d'assumer pleinement cet état de fait et au lieu de séparer les "technologies", en mettant d'un côté le **balisage** et de l'autre 
la **logique**, à décider de d'opter pour la fragmentation de son code avec comme unité les **composants**.  
Ces composants contiennent à la fois, le balisage et la logique mais sont isolés les uns des autres. C'est ce que l'on appelle la [**séparation des préoccupations**](https://fr.wikipedia.org/wiki/S%C3%A9paration_des_pr%C3%A9occupations).

### L'Utilisation des expressions JavaScript dans JSX
L'une des features très intéressantes de l'usage du JSX est la **possibilité d'intégrer dans le balisage des expressions JavaScript**, rendant 
ainsi notre balisage potentiellement dynamique. 
Ici, l'affichage variera en fonction d'une constante déterminée, mais nous pourrions imaginer que la variable *name* soit définie par l'utilisateur.

```
const name = 'Wilfried JUMELLE';
const element = <h1>Bonjour, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('app')
);
```

Comme nous avons accès aux expressions JavaScript, cela va de soit que nous avons accès à toutes fonctions définis dans notre code.  
Ainsi nous pourrions imaginer un travail de formatage autour du nom complet en unissant les variables *firstName* et *lastName* au sein d'une 
fonction.

Lorsque le JSX devient complexe à lire, il est important de ne pas hésiter à le **découper en plusieurs lignes**. Cela augmente la lisibilité du 
code sans pour autant le cassé. Il est recommandé d'encadrer le JSX multilignes par des parenthèses, afin d'éviter l'insertion de ; automatique.

```
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
```

Au final, après compilation les expressions JSX deviennent de simples **appels de fonctions JavaScript**, dont l'évaluation renvoie 
des objets JavaScript.  
Ce qui permet d'utiliser JSX à l'intérieur d'**instructions conditionnels (if)** ou dans des **boucles (for)**, ou bien encore l'**affecter 
à des variables**, l'accepter en **arguments de fonction** et le renvoyer depuis ces fonctions.

### Spécifier des attributs en JSX
À l'intérieur du JSX il est possible d'ajouter des **attributs HTML**.  
Cela peut se faire de 2 façons différentes : 
1. avec des **guillemets** pour spécifier des attributs sous forme de chaîne de caractères 
2. avec des **accolades** pour spécifier des attributs sous forme d'expressions JavaScript

Il ne faudra pas utiliser les deux en même temps !

> ❗ JSX utilise la casse **camelCase** pour le nommage des propriétés. Ainsi, `tabindex` devient `tabIndex`.
> Autre particularité, le mot-clé `class` étant déjà réservé en JavaScript, pour spécifier l'attribut class il faudra utiliser 
> ``className``.

```
const element = (
    <div tabIndex="0" className="card">
        <img src={user.avatar} />
    </div>
);
```

### Explication du fonction de JSX
Le JSX représente au final des objets.  
En effet, lorsque Babel compile du JSX, il produit des appels à **React.createElement()**. 

Ainsi, les deux codes suivants sont identiques : 
```
const element = (
  <h1 className="greeting">
    Bonjour, monde !
  </h1>
);
```

```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Bonjour, monde !'
);
```

Comme dit plus haut, ce que fait la méthode **React.createElement()** est simple : elle créé un objet, que l'on appelle **élément React**, 
après avoir effectué quelques vérifications de sécurité et de propreté.  
Nous obtiendrons donc approximativement l'objet suivant : 

```
// Remarque : cette structure est simplifiée
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Bonjour, monde !'
  }
};
```

Les éléments React sont des **descriptions** de ce que l'on veut voir apparaître à l'écran. React lit l'ensemble de ces objets et les 
utilise pour construire le DOM et le maintenir à jour. 

### JSX et la sécurité
Une autre feature intéressante du JSX étant la **vérification** et l'**échappement des données** avant d'effectuer le rendu par React.  
Ceci étant fait, on peut donc se servir des données provenant d'un input en affichage, sans craindre les problèmes d'injections (XSS par exemple).