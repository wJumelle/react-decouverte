# 🚀 Découverte de React

Découverte de React en suivant la [**documentation française**](https://fr.reactjs.org/docs/getting-started.html).
Version de React lors de la découverte : **v16.13.1**.

==> Lien vers [**Glossaire React**](https://fr.reactjs.org/docs/glossary.html)

## Sommaire
1. [**Objectifs**](#objectifs)
2. [**Introduction**](#introduction)
3. Guide étape par étape : [**Introduction à JSX**](#introduction-à-jsx)
4. Guide étape par étape : [**Le rendu des éléments**](#le-rendu-des-éléments)
5. Guide étape par étape : [**Composants et props**](#composants-et-props)

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

## Le rendu des éléments
Les éléments sont les **blocs élémentaires** d'une application React. **Un élément n'est pas un composant** !  
Les éléments sont la base même des composants React. 

Les éléments React, contraitement aux éléments du DOM, sont peu coûteux à créer, car très basique dans leur conception.  
**React DOM** va se charger de mettre à jour le DOM afin qu'il correspond aux éléments React créés. 

### Afficher un élément dans le DOM
Les applications développées en React ont généralement un DOM natif très simple, qui est composé d'**un et unique noeud DOM "racine"**.  
C'est à l'intérieur de ce noeud DOM "racine" que tout sera généré par **ReactDOM**. 

Pour effectuer le rendu d'un élément React à l'intérieur d'un noeud DOM "racine", rien de plus simple : il suffit d'utiliser la méthode suivante. 
```
HTML
<div id="app"></div>

JS
const elem = <h1>Un super titre pour bien commencer mon application</h1>
ReactDOM.render(elem, document.getElementById('app'));
```

La méthode **ReactDOM.render()** prend 2 paramètres : l'élément à générer à l'intérieur du noeud "racine" et ce même noeud "racine".  
[**Documentation de la méthode ReactDOM.render()**](https://fr.reactjs.org/docs/react-dom.html#render).

### Mettre à jours un élément déjà affiché
Les éléments React sont [**immuables**](https://fr.wikipedia.org/wiki/Objet_immuable), c'est à dire qu'une fois créé ils ne peuvent plus être 
modifié. Que ce soit, l'élément lui-même, ses enfants ou bien ses attributs.  
Pour imager les propos, un **élément React c'est comme un screenshot d'un film à un instant T**, l'élément représente donc l'UI à un point 
précis dans le temps. 

Avec nos connaissances actuelles, si l'on veut modifier cette UI, il faut donc créer un nouvel élément (ou bien le re-générer) et le passer 
de nouveau à la méthode ReactDOM.render().

> 💡 En pratique, la plus part des applications React n'appellent la méthode ReactDOM.render() qu'une seule fois au sein de leur code. 
> C'est là qu'intervient les **composants React**.

### L'intelligence de React autour de la mise à jours des contenus
React optimise les opérations qu'il doit effectuer sur le DOM en **comparant l'état précédent et l'état qu'on lui transmet**.  
De cette comparaison il va observer les variations et appliquer la mise à jour uniquement là où cela est nécessaire. 
Et cela se produit même si l'on demande à React de re-générer l'ensemble du noeud "racine". 

```
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
```

Le code ci-dessus va appeler la méthode ReactDOM.render() toutes les secondes, se faisant, il va re-générer le noeud racine de l'application 
toutes les secondes.  
Pourtant, si l'on observe la console de notre navigateur, nous pourrons observer que seul le noeud `<h2>` est réécrit à chaque appel. 

## Composants et props
Qu'est ce qu'un composant React ? Un composant React c'est tout simple une brique de l'interface utilisateur. C'est qui va nous permettre 
de subdiviser cette interface en élément totalement indépendants et réutilisables. Chacun de ces éléments pourra donc être considérée de 
manière isolée. 

==> [**Documentation détaillée des composants**](https://fr.reactjs.org/docs/react-component.html)

Le concept des composants est simple, nous avons des **propriétés (props) en entrée** et en **sortie nous obtenons un élément React**.

### Fonctions composants et composants à base de classe
Il existe **deux façons différentes** de définir des composants en React.  
1. via la création d'une fonction JavaScript = fonctions composants
2. via le création d'une classe ES6

La méthode la plus simple reste la première, c'est à dire celle qui consiste à écrire une fonction JavaScript pour produire un composant React. 
La fonction suivante est un composant React valide car elle accepte en arguments des propriétées props et retourne un élément React.

```
function Welcome(props) {
  return <h1>Bonjour, {props.name}</h1>
}
```

Voici la version de la fonction ci-dessus écrite à l'aide d'une classe ES6.

```
class Welcome extends React.Component {
  render() {
    return <h1>Bonjour, {this.props.name}</h1>;
  }
}
```

Ces deux composants sont **équivalents du point de vue de React**, nous obtiendrons au final le même élément React.

### Produire le rendu d'un composant
Jusqu'ici nous nous sommes servi de la méthode ReactDOM.render() uniquement pour affichage des éléments React représentant des balises du DOM. 
ReactDOM.render() peut aussi afficher des éléments React représentant des composants définis par l'utilisateur.  
Lorsque React va rencontrer un élément React de type composant, il va **transmettre les attributs JSX et les enfants à ce composant** sous la 
forme d'un objet unique : **props**.

```
function Welcome(props) {
  return <h1>Bonjour, {props.name}</h1>;
}

const elemComposants = <Welcome name="Wilfried" />;
ReactDOM.render(
  elemComposants,
  document.getElementById('app-composants')
);
```

Voici ce qui se produit dans notre contexte : 
1. la méthode ReactDOM.render() est appelé avec en paramètre l'élément *elemComposants* qui est un élément React de type *componsants* `<Welcome />.` 
2. React appelle le composant `<Welcome />` et lui transmets les props {name = 'Wilfried'}
3. le composant `<Welcome />` retourne l'élément React `<h1>Bonjour, {props.name}</h1>` où {props.name} vaut Wilfried.
4. ReactDOM met à jours efficacement le DOM pour correspond à la valeur retournée par le composant `<Welcome />`

> 💡 Petit point autour des règles de nommages : React considère les composants commençant par une minuscule comme étant des balises du DOM. 
> Par ex : `<div />` sera perçu comme une balise HTML `<div></div>`, tandis que `<Welcome />` représente lui un composant React. 
> Autre particularité lors de l'appel d'un composant, il faut s'assurer que ce composant soit bien disponible et présent dans la portée 
> courante ! 
> Pour plus d'information autour de cette convention de nommage, vous pouvez lire la documentaiton [**JSX en profondeur**](https://fr.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

### Composition des composant
Comme dit plus haut, la plus part des applications récentes ne font appel qu'une seule fois à la méthode ReactDOM.render(), comment pouvons-nous 
expliquer cela ? 
Tout simplement car un composant peut faire **référence** à d'autres composants. Ce qui nous permet par exemple, de mettre en place un composant 
`<Formulaire />` dans lequel nous ferons références à plusieurs composants `<Champ />`.
Ce qu'il faut comprendre, c'est que dans React tous les éléments de l'interface utilisateur sont exprimés par des composants.

En règle générale, les nouvelles applications React comporteront un seul et unique composant `<App />` à la racine. Ce sera ce composant que l'on 
générera via la méthode ReactDOM.render().

```
function Welcome(props) {
  return <h1>Bonjour, {props.nam} !</h1>
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
```

### Extraire des composants
Lorsqu'un composant devient trop important et qu'il devient complexe à lire et à maintenir, c'est que l'on peut mieux faire ! Comment ?  
En cherchant à **scinder ce composant en plusieurs briques distinctes** que l'on pourra réutiliser séparément du contexte de ce composant.  

Il est très important de toujours évaluer la taille des composants que l'on créé mais aussi la réutilisabilité de certains éléments de ce composant.  
Si un élément intervant dans un composant est redéfini dans un, deux ou trois autres composants, c'est que l'on peut extraire cette brique pour en faire 
un composant isolé.

Prenons ici exemple sur un composant `<Comment />` dont le but serait d'afficher un commentaire dans un réseau social. 

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

A la première lecture on se rend compte de deux choses : nous avons des informations sur le message et sur son auteur.  
Les informations sur l'auteur pourraient être réutilisés ailleurs, par exemple lors de l'affichage de son profil.  
Nous allons donc chercher à extraire ce composant afin de l'isoler, comme ceci : 

```
Etape 1 : Création du composant <Avatar />
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

Etape 2 : Création du composant <UserInfo />
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

Etape 3 : Update du composant <Comment />
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

### Les props sont en lecture seul
Point très importants, que nous déclarions les composants à l'aide d'une fonction ou d'une classe ES6, ce dernier **ne doit jamais modifier ses propres props**.  
**❗ Tout composant React doit agir comme une fonction pure vis-à-vis de ses props.**