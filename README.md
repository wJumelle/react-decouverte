# 🚀 Découverte de React

Découverte de React en suivant la [**documentation française**](https://fr.reactjs.org/docs/getting-started.html).
Version de React lors de la découverte : **v16.13.1**.

==> Lien vers [**Glossaire React**](https://fr.reactjs.org/docs/glossary.html)

==> Lien vers [**Les fondamentaux**](https://fr.reactjs.org/docs/hello-world.html)

## Sommaire
1. [**Objectifs**](#objectifs)
2. [**Introduction**](#introduction)
3. Guide étape par étape : [**Introduction à JSX**](#introduction-à-jsx-doc)
4. Guide étape par étape : [**Le rendu des éléments**](#le-rendu-des-éléments-doc)
5. Guide étape par étape : [**Composants et props**](#composants-et-props-doc)
6. Guide étape par étape : [**État et cycle de vie**](#état-et-cycle-de-vie-doc)
7. Guide étape par étape : [**Gérer les événements**](#gérer-les-événements-doc)
8. Guide étape par étape : [**Affichage conditionnel**](#affichage-conditionnel-doc)
9. Guide étape par étape : [**Listes et clés**](#listes-et-clés-doc)
10. Guide étape par étape : [**Formulaires**](#formulaires-doc)
11. Guide étape par étape : [**Faire remonter l'état**](#faire-remonter-létat-doc)
12. Guide étape par étape : [**Composition ou héritage**](#composition-ou-héritage-doc)

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

[**☝ Retour en haut de page**](#-découverte-de-react)
## Introduction à JSX ([doc](https://fr.reactjs.org/docs/introducing-jsx.html))
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
code sans pour autant le casser. Il est recommandé d'encadrer le JSX multilignes par des parenthèses, afin d'éviter l'insertion de ; automatique.

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

## Le rendu des éléments ([doc](https://fr.reactjs.org/docs/rendering-elements.html))
Les éléments sont les **blocs élémentaires** d'une application React. **Un élément n'est pas un composant** !  
Les éléments sont la base même des composants React. 

Les éléments React, contraitement aux éléments du DOM, sont peu coûteux à créer, car très basique dans leur conception.  
**React DOM** va se charger de mettre à jour le DOM afin qu'il correspond aux éléments React créés. 

### Afficher un élément dans le DOM
Les applications développées en React ont généralement un DOM natif très simple, qui est composé d'**un et unique noeud DOM "racine"**.  
C'est à l'intérieur de ce noeud DOM "racine" que tout sera généré par **ReactDOM**. 

Pour effectuer le rendu d'un élément React à l'intérieur d'un noeud DOM "racine", rien de plus simple : il suffit d'utiliser la méthode suivante. 
```
//HTML
<div id="app"></div>

//JS
const elem = <h1>Un super titre pour bien commencer mon application</h1>
ReactDOM.render(elem, document.getElementById('app'));
```

La méthode **ReactDOM.render()** prend 2 paramètres : l'élément à générer à l'intérieur du noeud "racine" et ce même noeud "racine".  
==> [**Documentation de la méthode ReactDOM.render()**](https://fr.reactjs.org/docs/react-dom.html#render).

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

[**☝ Retour en haut de page**](#-découverte-de-react)
## Composants et props ([doc](https://fr.reactjs.org/docs/components-and-props.html))
Qu'est ce qu'un composant React ? Un composant React c'est tout simple une brique de l'interface utilisateur. C'est ce qui va nous permettre 
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
Jusqu'ici nous nous sommes servi de la méthode ReactDOM.render() uniquement pour l'affichage des éléments React représentant des balises du DOM. 
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

[**☝ Retour en haut de page**](#-découverte-de-react)
## État et cycle de vie ([doc](https://fr.reactjs.org/docs/state-and-lifecycle.html))

==> [**Documentation de la référence API des composants**](https://fr.reactjs.org/docs/react-component.html)

Dans l'exemple précédent autour de l'horloge, nous avions vu que notre élément était mis à jours à l'aide d'un interval JavaScript 
mis en place qui toutes les X secondes appelait la fonction qui générait le JSX et effectuée l'appel à la méthode ReactDOM.render(). 

Cette façon de faire n'est pas optimale, en effet, tout est dispersé dans notre code et cela force à isoler l'appel à la méthode de 
rendu. Or nous l'avons vu précédement, il est souhaitable d'appeler cette méthode **qu'une seule fois** dans l'application.

Il va donc falloir trouver un autre moyen de concevoir notre composant, afin que celui-ci soit totalement **isolé** et potentiellement 
**réutilisable**.  
Ce composant aura pour fonction de mettre en place son propre minuteur et de se mettre à jour automatiquement. Il sera **indépendant**. 

Ainsi, pour débuter ce travail, nous pouvons passer de ce code : 

```
function tick() {
  const element = (
    <div>
      <h1>Bonjour, monde !</h1>
      <h2>Il est {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

tick();
setInterval(tick, 1000);
```

à celui-ci : 

```
function Clock(props) {
  return (
    <div>
      <h1>Bonjour, monde !</h1>
      <h2>Il est {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

Ici, on peut voir que le composant `<Clock />` n'est pour l'instant pas encore indépendant. Ce que nous souhaiterions obtenir, serait 
plutot ceci : 

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Dans cette version, la méthode ReactDOM.render() n'est plus comprise dans l'intervale JavaScript. Cet interval va être géré au niveau 
du composant, tout comme le rafraichîssement de son contenu. 

Pour implémenter ça, nous avons besoin d'ajouter un **état local** au composant `<Clock />`.  
L'état local est assez similaire aux props, mais est **privé** et complétement contrôlé par le composant.

### Convertir une fonction en classe
Pour convertir un composant fonctionnel en un composant de type classe, il suffit de faire quelques réajustements.  
1. **Création de la classe ES6** qui portera le nom de notre composant et qui **étendra React.Component**
2. **Créer une méthode render()** dans laquelle on viendra déposer le code JSX
3. **Remplacer props par this.props**

Ce qui donne :
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>États et cycle de vie - format class</h1>
        <h2>Il est {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
} 
```

Ce faisant, la méthode ``render()`` du composant `<Clock />` sera appelé à chaque fois qu'une variation de ce composant sera 
détectée par React. 
Tant que l'on exploite le rendu du composant `<Clock />` dans le même noeud DOM "racine", une seule instance de la classe **Clock** 
sera utilisée. Ce qui va nous permettre d'utiliser les fonctionnalités supplémentaires suivantes : **l'état local** et les méthodes de 
**cycle de vie**.

### Ajouter un état local à une classe
Il va de nouveau falloir suivre quelques étapes pour réussir à intégrer la fonctionnalité d'état local. 
1. **Modifier l'appel à la variable** qui correspond à la date : passer de `this.props.date` à `this.state.date`
2. **Créer le constructeur de notre classe** et y passer en paramètre les **props**
3. **Supprimer l'initialisation de la date** dans l'appel au composant

Ce qui nous donne : 
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(); }
  }

  render() {
    return (
      <div>
        <h1>États et cycle de vie - format class</h1>
        <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

function tick() {
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

> ❗ Les constructeurs de classe doivent toujours passer props en paramètres.  
> ❗ A l'intérieur de ces mêmes constructeurs nous devons toujours appeler le constructeur parent de notre classe en y passant 
> les props en paramètres. Pour cela nous utilisons le mot-clé `super(props)` ([**doc MDN**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/super)).

### Ajouter des méthodes de cycle de vie à une classe
Dans des applications avec de nombreux composants, il est primordiale de veiller à optimiser les ressources utilisées par ces composants.  
Ainsi, si un compostant est détruit il faut libérer les ressources qui lui étaient associées.  

Nous désirons internaliser à notre composant `<Clock />` la gestion et la mise en place du minuteur.  
Cette création surviendra la première fois que notre composant sera ajouté au DOM.  
Dans React on appelle cette phase **le montage**.

A l'inverse, lorsqu'un composant est détruit / supprimé du DOM, on appelle cette phase **le démontage**. 
Au cours de cette phase de démontage, il faudra veiller à la suppression du minuteur. 

Les phases de montage et de démontage sont "écoutées" dans React par deux méthodes spéciales : `componentDidMount()` et `componentDidUnMount()` 
pour le démontage.

Ce qui nous donne le code suivant : 

```
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
```

Pour résumer ce qu'il se produit : 
1. Le composant `<Clock />` est passé à la méthode `ReactDOM.render()`. Se faisant React appelle le constructeur du composant et 
initialise ainsi `this.state` en y ajoutant la valeur de la date à laquelle le constructeur a été appelé
2. React appelle finalement la méthode `render()` du composant `<Clock />` afin de découvrir ce qu'il faut afficher à l'écran. React 
met ensuite à jour le DOM pour correspondre à la sortie reçue par le composant
3. React détecte le montage du composant `<Clock />` et déclenche sa méthode de cycle de vie `componentDidMount()` créant ainsi 
l'intervale qui toute les secondes va mettre à jour la valeur de `this.state` à l'aide de l'appel à la méthode `this.setState()`, en 
y passant en paramètre un objet correspondant à la nouvelle date. C'est grâce à l'appel de cette méthode que React sait que l'état du 
composant a changé, en conséquence React appelle la méthode `render()` du composant afin de déterminer ce qui devrait s'afficher à 
l'écran avec ce nouvel état. React va faire la comparaison de la sortie retournée par le composant `<Clock />` et ce qui est 
actuellement dans le DOM et détecter une différence. React met alors le DOM à jour en accord avec le nouveau rendu.
4. Si le composant `<Clock />` est retiré du DOM, alors la méthode de cycle de vie `componentDidUnmount()` du composant sera appelée 
par React pour que le minuteur soit arrêté et l'intervale supprimé. 

### Utiliser l'état local correctement 
Il y a trois choses à savoir à propos de la méthode `setState()` :
1. Il ne faut pas modifier l'état directement `this.state.date = new Date()` n'est pas correct, à la place il faut faire 
`this.setState({ date: new Date() })`. Le seul endroit où l'on peut affecter l'objet `this.state` c'est à l'intérieur du constructeur.
2. Les mises à jours de l'état peuvent être asynchrones. Ce faisant, il ne faut pas se baser sur les valeurs de `this.state` et 
`this.props` pour calculer la prochaine valeur de l'état à venir. Pour remédier à cela, il existe une deuxième version de la méthode 
`this.setState((state, props) => { counter: state.counter + props.increment })` qui est basé sur le passage en paramètre d'une fonction 
(qui peut être fléchée ou non) à la place d'un objet. Cette fonction possède 2 arguments : l'état précédent du composant et les props 
au moment de la mise à jour.
3. Les mises à jours de l'état sont fusionnées. Cela veut dire que lorsque l'on possède un état `this.state` qui contient plusieurs 
objets, lors de l'appel à la méthode `this.setState()` nous ne sommes pas obligé d'indiquer tous les objets inclus dans l'état. Nous allons pouvoir spécifier uniquement l'objet qui varie.  

Voici un exemple pour démontrer le fonctionnement expliquer autour du troisième point : 
```
[...]
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

La fusion n'est pas **profonde**, ce qui fait que `this.setState({comments})` laissera `this.state.posts` intacte, mais remplacera 
complétement `this.state.comments`.

### Les données descendent
L'arborescence des composants React d'une application pourrait être vu comme une grande cascade d'eau, dont l'eau coulerait du haut vers le bas.  
Le haut de la cascade représente les premiers composants, ceux qui englobent, le bas représent leurs descendants. 

Nul parent ou enfant peut savoir si un certain composant est à état ou non, et ceci même si l'un des composants descend de l'autre. Et il ne 
devrait pas avoir à se soucier s'il est défini par une classe ou par une fonction.  
Rappelons qu'un élément définie par une fonction ne peut avoir état, car celui-ci ne contient pas de constructeur pour initialisé son état. 

C'est pourquoi on dit souvent en React que l'état est **local** ou **encapsulé**. Il est tout-à-fait impossible d'y accéder d'un autre 
composant. 

Cependant, il est possible qu'un composant parent décide de passer à un composant enfant des informations des ses **props** ou de son **état** 
via les **props** du composant enfant `<FormattedDate date={this.state.date}>` où ici, `this.state.date` correspond à l'état du composant 
parent.  
Le composant enfant va donc recevoir cette information, mais ne sera pas en capacité de savoir la nature de l'information. C'est-à-dire 
si elle provient des **props**, de **l'état** du composant parent ou bien encore si elle a été simplement tapé à la main. 

On appelle ça un flux de données "du haut vers le bas" ou "unidirectionnel".  
Un état local est toujours possédé uniquement par un composant spécifique, et toute donnée ou UI dérivée de cet état ne peut 
affecter que les composants descendants de celui-ci.

Dans une application React, le fait qu'un composant soit à l'état ou non est considéré comme un **détail d'implémentation** du 
composant qui peut varier avec le temps.  
Vous pouvez très bien utiliser un composant avec état, à l'intérieur d'un composant sans état, et vice-versa. 

[**☝ Retour en haut de page**](#-découverte-de-react)
## Gérer les événements ([doc](https://fr.reactjs.org/docs/handling-events.html))

La gestion des événements pour les éléments React possède une synthaxe très proche de celle pour les éléments du DOM, à quelques détails 
près : 
1. les événements de React sont nommés en **camelCase** plutôt qu'en minuscule
2. En JSX on passe **une fonction** comme gestionnaire d'événement plutôt qu'une chaîne de caractère

Ce qui donne : 
```
// HTML
<button onclick="doSomeThg()">
  Je réalise une action
</button>

// React
<button onClick={doSomeThg}>
  Je réalise aussi une action
</button>
```

Autre élément qui à son importance, en React nous ne pouvons pas `return false` pour empêcher le comportement par défaut d'un élément HTML.  
Pour cela Il faut explicitement appeler `preventDefault()`.

```
// HTML
<a href="#" onclick="console.log('Le lien a été cliqué"); return false;">
  Clic !
</a>

// React
function ActionLink() {
  function handleClick(e) {
    e.prenventDefault();
    console.log('Le lien a été cliqué');
  }

  return (
    <a href="#" onClick={handleClick}>
      Clic !
    </a>
  )
}
```

Ici, `e` est ce que l'on appelle un [**événement synthétique**](https://fr.reactjs.org/docs/events.html). React le définit selon les normes 
W3C afin que nous n'ayions pas à nous préoccuper de la compatibilité entre les navigateurs.  
Les événements React ne fonctionnent pas tout à fait comme les éléments natifs, il est donc conseillé de creuser d'avantage leur fonctionnement 
en suivant le lien vers la documentation renseignée juste avant.

Lorsque l'on utilise React, nous n'aurons que très rarement besoin de l'appelle à la méthode `addEventListener`.  
Tout simplement car nous passons l'ensemble des écouteurs lors du rendu initial de l'élément.

Lorsque l'on utilise les [**classes ES6**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) afin de définir un 
composant, il est d'usage de faire en sorte que les gestionnaires d'événements de ce composant soient des méthodes de la classe. 

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true }

    // On réalise une liaison entre la méthode et le mot-clé this
    // Cette étape est obligatoire pour permettre l'utilisation de this
    // dans la fonction de rappel
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
```

En JSX il faut être prudent avec l'usage de `this` au sein des fonctions de rappel.  
En effet, en JavaScript, nativement, les méthodes de classes ne sont pas liées par défaut.  
Si on oublie de lier, dans le constructeur, `this.handleClick` à `this` à l'aide de la fonction [`bind()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)  
et qu'on l'utilise à l'intérieur de la fonction de rappel alors `this` sera égale à `undefined` quand la fonction sera appelée. 

Comme dit plus tôt, ce comportement n'est pas propre à React, mais il provient bien d'une [**spécificité des fonctions en JavaScript**](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/).  
En général, si nous faisons appelle à une méthode sans `()` alors nous serons dans l'obligation de la lier avec `bind()`. 

Si nous ne voulons pas utiliser `bind()` il existe deux autres méthodes : 
1. l'utilisation de [**la syntaxe des champs de classes**](https://babeljs.io/docs/plugins/transform-class-properties/) (expérimentale)
2. sinon en utilisant simplement les [**fonctions fléchées**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions) pour les fonctions de rappels

```
// 1 - champs de classes
class LoggingButton extends React.Component {
  // Cette syntaxe nous assure que `this` est bien lié dans la méthode handleClick.
  // Attention : cette syntaxe est encore *expérimentale*.
  handleClick = () => {
    console.log('this vaut :', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Clique ici
      </button>
    );
  }
}

// 2 - fonctions fléchées dans les fonctions de rappels
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this vaut :', this);
  }

  render() {
    // Cette syntaxe nous assure que `this` est bien lié dans la méthode handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Clique ici
      </button>
    );
  }
}
```

> ❗ Cependant, il faut faire très attention avec l'usage de la troisième méthode. En effet, à chaque rendu du composant une nouvelle 
> fonction de rappel sera créée.  
> Dans la plus part des cas, ce n'est pas dérangeant, mais si nous passons cette fonction en props à des composants plus bas dans l'arbre 
> ces composants risqueraient de forcer des ré-affichages superflus du composant.  
> Il est donc déconseillé d'utiliser cette troisième méthode. 

### Passer des arguments à un gestionnaire d'événements

Au sein d'une boucle, qui itérerait par exemple jusqu'à créer toutes les lignes d'un tableau, il est courant de vouloir passer un 
argument supplémentaire à un gestionnaire d'événement.  
Par exemple, si `id` ici représente l'ID de la ligne du tableau en question, nous pourrions imaginer d'écrire le composant de ces 
deux manières différentes : 

```
// 1 - Avec la fonction fléchée
<button onClick={(e) => this.deleteRow(id, e)}></button>

// 2 - Avec la méthode bind()
<button onClick={this.deleteRow.bind(this, id)}></button>
```

Les lignes précédentes sont équivalentes et utilisent respectivement les **fonctions fléchées** et **Function.Prototype.bind**.  
Dans les deux cas, l’argument `e` represente l’événement React qui sera passé en second argument après l’ID. Avec une fonction fléchée, nous devons passer l’argument explicitement, alors qu’avec bind tous les arguments sont automatiquement transmis.

[**☝ Retour en haut de page**](#-découverte-de-react)
## Affichage conditionnel ([doc](https://fr.reactjs.org/docs/conditional-rendering.html))
L'une des plus grandes forces de React est la facilité à fragmenter notre code en petites briques totalement indépendantes.  
La conception de ces composants distincts, qui englobent leur propre logique et leur rendu, permet nottamment la facilitation de la gestion 
d'un affichage conditionnel, suivant l'état de notre application. 

L'affichage condtionnel en React fonctionne exactement pareil que les conditons `if` en JavaScript. 
En React on peut utiliser `if` ou `l'opérateur ternaire` pour créer des éléments représentant l'état courant.  
React ensuite n'aura plus qu'à mettre à jours l'UI pour qu'elle corresponde. 

Considérons le code suivant : nous pouvons observer la présence de deux premiers composants `<SalutLabo />` et `<SalutLunknow />` 
dont le but est de créer un élément React représentant un message de bienvenue.  
Ensuite, nous avons crée un composant `<MessageDeBienvenue />` dont le but est d'observer la valeur de sa props `isLoggedIn` et d'en 
déterminer le composant à afficher. 

```
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
```

### Variables d'éléments
En React il est tout à fait possible de stocker des éléments React dans des variables. Quel peut en être l'utilité ?  
Tout simplement de faciliter la lecture, mais aussi la gestion de l'affichage conditionnel.  
Ainsi, en fonction d'une condition, on pourra stocker à l'intérieur de la variable `maVar` un composant ou un autre, pour finalement 
lors de l'appel de la méthode `render()` du composant englobant n'avoir qu'à insérier la variable à l'intérieur d'une expression `{maVar}`.

Considérons le code qui suit : tout d'abord nous avons créé deux fonctions composants `<LoginButton />` et `<LogoutButton />`.  
Chacun permet de créer un élément React représentant soit un bouton de connexion, soit de déconnexion.
```
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
```

Ensuite, nous avons mis en place le composant à état `<LoginControl />`. Celui-ci contient l'état de connexion ainsi que les deux 
méthodes permettant de switcher entre les deux états.  
A l'intérieur de sa méthode de `render()` nous vérifions la valeur de l'état `isLoggedIn` afin de choisir quel composant charger et 
de lui associer la bonne méthode. Nous stockons cet élément dans la variable `button` que nous retournons sous la forme `{button}`.
```
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
```

Il existe d'autres façons, plus concise, de réaliser un affichag conditionnel. Cependant, celles-ci perdent légèrement en lisibilité de code. 

### Condtion à la volée avec l'opérateur logique &&
L'une des forces du JSX est, comme nous l'avons déjà dit, la capacité à pouvoir gérer toutes sortes d'expresion JavaScript à l'aide des 
accolades.

Une expression en particulier va nous intéresser pour le thème de ce sous-chapitre : les expresions utilisant l'opérateur `&&`.  
En JavaScript `true && expression` sera toujours évalué à `expression`, alors que `false && expression` sera évalué à `false`.  
Jusqu'ici rien d'anormal, mais si nous projettons ce concept dans l'écriture de notre JSX, nous pourrions obtenir ce genre de résultat : 

Ici, comme `unreadMessages.length` vaut 3, alors `unreadMessages.length > 0` vaut `true` et donc notre test étant évalué à `true` on 
affiche ce qu'il y a après le `&&`.
```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Bonjour !</h1>
      {unreadMessages.length > 0 &&
        <h2>
          Vous avez {unreadMessages.length} message(s) non-lu(s).
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

### Alternative à la volée avec opérateur ternaire
Une autre méthode pour l'affichage conditionnel à la volée d'élément est l'utilisation de l'opérateur ternaire JavaScript.  
Cet opérateur ternaire peut se retrouver dans une forme très concise (en une seule ligne) ou plus lourde (en plusieurs lignes).

```
// Version concise
return (
  <div>
    L’utilisateur <b>{isLoggedIn ? 'est actuellement' : 'n’est pas'}</b> connecté.
  </div>
);

// Version lourde
return (
  <div>
    {isLoggedIn
      ? <LogoutButton onClick={this.handleLogoutClick} />
      : <LoginButton onClick={this.handleLoginClick} />
    }
  </div>
);
```

Il est important de se rendre compte que toutes ces méthodes arrivent à une même finalité, le choix de la méthode dépendra donc 
des préférences de lisibilité en vigueur pour nous et notre équipe.  
Il est aussi important de garder à l'esprit que dès que vous avez l'impression que votre code devient trop complexe, c'est potentiellement 
qu'il faut fragmenter vos composants en extrayant certains.

### Empêcher l'affichage d'un composant
C'est assez rare, mais parfois vous allez voir masquer un élément quand bien même celui-ci figure dans le rendu d'un autre composant. 
Cela est possible dans React à l'aide du mot-clé `null`.  
En effet, tout composant retournant la valeur `null`, au lieu de son affichage habituel, ne sera pas affiché.  

```
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Attention !
    </div>
  );
}
```

> ❗ Renvoyer la valeur `null` à l'intérieur de la méthode `render()` d'un composant n'affectera pas les appels aux méthodes de cycle 
> de vie du composant (`componentDidUpdate`, `componentDidMount`, `componentWillUnmount` etc.).

[**☝ Retour en haut de page**](#-découverte-de-react)
## Listes et clés ([doc](https://fr.reactjs.org/docs/lists-and-keys.html))
En JavaScript il existe une méthode magique : `map()`.  
Cette dernière prends en entrée un tableau et retourne en sortie un tableau qui a été travaillé par une fonction.  
En React, transformer un tableau en une liste d'élément est quasi identique. 

### Afficher plusieurs composants
En React, il est possible de construire une **collection d'élément** et des les inclure par la suite dans du JSX à l'aide des `{}`.
Pour cela, il suffit d'utiliser la méthode `map()` de JavaScript afin d'initialiser une variable qui contiendra notre collection d'élément. 

```
const numbers = [1, 2, 3, 4, 5]; 
const listNumber = numbers.map( (number) => <li>{numbers}</li> );

ReactDOM.render(
  <ul>{listNumber}</ul>,
  document.getElementById('app-introMap')
)
```

### Composant basique de liste
En général, ce que l'on cherche à faire, c'est internaliser à l'intérieur d'un composant l'affichage / la gestion de notre liste.  
On va donc transformer l'exemple précédent afin que le fonctionnement se fasse à l'aide d'un composant, qui acceptera en entrée un tableau de nombre 
en attribut JSX et produira la liste en sortie. 

```
function NumberList(props) {
    const numbers = props.numbers; 
    const listItems = numbers.map( (number) => <li key={number.toString()}>{number}</li> );

    return (
        <ul className="NumberList">{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5]; 

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('app-introMap')
)
```

> ❗ `key` est un attribut spécial en JSX que l'on doit forcément inclure lorsque créé une liste d'éléments.  
> En effet, l'une des choses importante à savoir lorsque l'on manipule les listes d'éléments en React, c'est que React à besoin d'un 
> identifiant (la `key`), pour chacun des éléments, afin de tout simplement cibler l'élément à mettre jours si une évolution est constatée.  

Si l'on ne spécifie pas l'attribut `key` pour chacun des éléments de notre liste, alors React émettra une erreur dans la console. 

### Les clés
Les clés aident React à identifier quels éléments d'une liste ont changé, ont été ajoutés ou supprimés. On doit donc ajouter une clé 
à chaque élément d'un tableau afin de leur apporter une identité stable. 

> 💡 Le meilleur moyen de choisir une clé est d'utiliser quelque chose qui identifie de façon unique un élément d'une liste parmi ses voisins. 
> En effet, le caractère unique d'une `key` n'a d'importance qu'uniquement dans le contexte de la liste qui contient l'élément identifié par la `key`.

> ❗ Quand un ID stable n'est pas facilement trouvable pour les éléments à afficher, alors nous pouvons utiliser l'index de l'élément, en 
> dernier recours.  
> Il n'est pas recommandé d'utiliser l'index comme clé si l'ordre des éléments viendrait à évoluer. Cela pourrait avoir un effet négatif 
> sur les performances et causer des problèmes avec l'état du composants. 

==> Lien vers un article [**autour de l'explication en profondeur de l'impact négatif de l'utilisation de l'index comme clé**](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318).

### Extraire des composants avec des clés
Les clés n'ont une signification que dans le contexte du tableau qui les entoure. 
Ainsi, lorsque l'on extrait des composants qui possèdent des clés il faut veiller à bien garder l'information `key` sur le composant en lui-même 
et non sur l'élément `<li>`. 

En reprennant l'exemple ci-dessus mais en extrayant l'élément `<li>` dans un nouveau composant `<ListItem />` nous obtiendrons donc 
```
function ListItem(props) {
  return (
      <li className="extractedListItem">{props.value}</li>
  );
}

function NumberList(props) {
  const numbers = props.numbers; 
  const listItems = numbers.map( (number) =>
    <ListItem key={number.toString()} value={number} />
  );

  return (
    <ul className="NumberListExtractComponent">
      {listItems}
    </ul>
  )
}

const numbers = [1, 2, 3, 4, 5]; 

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('app-introMap')
)
```

Il faut bien garder en tête que chaque élément à l'intérieur d'un appel à `map()` à besoin d'une clé.

### Les clés n'ont besoin d'être uniques qu'au sein de la liste
La portée des clés étant le tableau qui l'entoure alors celles-ci n'ont besoin d'être uniques que parmi leurs voisins, elles n'ont 
pas besoin de l'être globalement.  

Les clés servent d'indicateur à React, mais elles ne sont pas passé à l'intérieur des `props` de celui-ci. Ainsi, si vous souhaitez 
accéder à cette information il faudra la passer dans une prop avec un nom différent. 

```
const listItems = numbers.map( (number) =>
  <ListItem key={number.toString()} id={number.toString()} value={number} />
);
```

### Intégrer map() dans du JSX
JSX permettant d'intégrer des expressions quelconques à l'aide des `{}` nous pouvons donc facilement intégrer la méthode `map()` 
à notre JSX. 
Encore une fois, cela dépendra de vos habitudes de codages avec votre équipe car l'inclusion de la méthode `map()` à l'intérieur du 
JSX peut rapidement complexifié la lecture du rendu attendu par votre composant.  

```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**☝ Retour en haut de page**](#-découverte-de-react)
## Formulaires ([doc](https://fr.reactjs.org/docs/forms.html))
Les formulaires en React fonctionne différement que les autres éléments React.  
En effet, chaque élément de formulaire HTML possèdent déjà un état interne. Par exemple, un champ `<input type="text" name="nom" />` 
possède un état interne qui est sa valeur, transmise par `value`.

Si l'on souhaite obtenir le même résultat qu'un simple formulaire HTML, c'est à dire avoir des champs qui contiennent des valeurs et 
les soumettre à une nouvelle page au clic du bouton de validation, alors il n'y a rien à faire du côté de React.  
Cependant, si vous désirez gérer la validation de la saisie de vos données en JavaScript il faudra réaliser quelques manipulations 
supplémentaires. 
Il existe plusieurs façon de gérer ça en React, la plus classique étant les `composants contrôlés`.

### Composants contrôlés
Les éléments HTML `<input />`, `<select />` ou encore `<textarea />` maintiennent généralement leur propre état et se mettent à jour 
par rapport aux saisies de l'utilisateur.  
En React, l'état modifiable est généralement stocké dans la props `state` et modifiable uniquement via `setState()`.

Le principe d'un **composant contrôlés** c'est la fusion de ces deux concepts.  
On utilise l'état local de React comme **source unique de vérité**, ainsi le composant React qui affiche le formulaire gère 
aussi le comportement de celui-ci par rapport aux saisies de l'utilisateur. 

Ci-dessous un exemple avec un simple champ de formulaire de type texte, qui s'initialise à la valeur de `this.state.value`, donc `''`.
Lorsque l'utilisateur modifie la valeur du champ, alors React met aussi à jour la valeur de l'état local `this.state.value` grâce à 
la méthode `setState()` comprise dans la méthode du composant de type classe `handleChange()`.  
Méthode elle-même appelée par le gestionnaire d'événement `onChange` présent sur le champ de formulaire.

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Le nom a été soumis : ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}
```

Maintenant que nous avons définit l'attribut `value` de notre champ formulaire, la valeur affichée sera alors toujours égale à 
`this.state.value`, faisant ainsi de l'état local de React la source de vérité.  
Dans un **composant contrôlé** on dit que la valeur du champ est en permanence pilotée par React. 

### La balise textarea
En HTML, la balise `<textarea />` définit son texte via ses enfants.  
En React, le comportement pour traiter cette balise va se révéler être assez proche de celui des champs `<input />` classique : nous 
allons de nouveau nous servir de l'attribut `value`.

```
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Écrivez un essai à propos de votre élément du DOM préféré'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Un essai a été envoyé : ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}
```

Nous observons qu'ici la valeur de l'état local `this.state.value` a été initalisé non vide. Ainsi, l'élément `<textarea />` 
contiendra à l'initialisation du formulaire une valeur par défault. 

### La balise select
En HTML, la balise `<select />` créée une liste déroulante d'options aux valeurs différentes.  
Toujours en HTML, nous avons la possibilité d'ajouter un attribut `selected` à l'une des options afin que celle-ci soit la valeur 
par défault de nos champ select. En React, nous ne passons pas par cet attribut, mais de nouveau par l'attribut `value` définit 
sur la balise select elle-même.  
Cela rend les choses plus évidente pour gérer la mise à jours du champ. 

Dans l'exemple ci-dessous, nous observons que le composant `<FlavorForm />` possède une valeur par défaut pour l'état local `this.state.value`.  
Ceci définit la valeur `coconut` comme étant la valeur de l'option pré-sélectionnée. 
```
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Votre parfum favori est : ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Choisissez votre parfum favori :
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Pamplemousse</option>
            <option value="lime">Citron vert</option>
            <option value="coconut">Noix de coco</option>
            <option value="mango">Mangue</option>
          </select>
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}
```

Au final, cela permet aux balises HTML `<input />`, `<textarea />` et `<select />` de posséder un fonctionnement très semblable.  
Elles acceptent toutes les trois un attribut `value` permettant l'implémentation d'un composant contrôlé.

> 💡 Au sujet des balises `<select />`, il faut savoir que la sélection d'options multiples est autorisée et possible en React. 
> Pour cela il suffit tout simplement de passer à l'attribut `value` un tableau des options concernées et d'ajouter l'attirbut `multiple` 
> initialisé à la valeur `true`.

### La balise input de type="file"
La valeur de la balise input de type="file" étant en lecture seule, c'est que l'on appelle en React un [**composant non-contrôlé**](https://fr.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag).  
Ce type de composant sera à voir au cours du guide avancé. 

### Gérer plusieurs saisies
Lorsque l'on souhaite gérer plusieurs champs à l'intérieur d'un même composant React, nous pouvons utiliser l'attribut `name` qui liera 
chaque champ à un identifiant.  
Ainsi, ce sera à la fonction gestionnaire de choisir quoi faire en fonction de la valeur `event.target.name` de l'événement synthétique.

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Participe :
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Nombre d'invités :
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

Nous pouvons observer l'utilisation de la syntaxe des [**propriétés calculés**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Initialisateur_objet#Noms_de_propri%C3%A9t%C3%A9s_calcul%C3%A9s) (`[name]: value`) pour mettre à jour la valeur de l'état 
correspondant au nom du champ. 

Comme la méthode `setState()` fusionne automatiquement un état partiel dans l'état courant du composant, il est ainsi possible 
de simplement mettre à jour le formulaire avec les parties modifiées. 

### Valeur nulle dans champs contrôlés
L'une des choses frustrante lorsque l'on commence à manipuler les formulaires en React c'est la compréhension de l'attribut `name`.  
En effet, si celui-ci est défini par une valeur en dur sur un composant contrôlé, par exemple `value=''`, alors cela va bloquer 
notre champ de saisie et le rendre totalement inutilisable par l'utilisateur.  

Si le comportement voulu est de pré-saisir le champ, mais de tout de même le laisser éditable par l'utilisateur, alors il faut 
"**accidentellement**" donner la valeur `null` ou `undefined` à l'attribut `value`. 

```
ReactDOM.render(
  <input type="text" value="Salazar Serpentard" />,
  document.getElementById('monNoeudRacine')
);

setTimeout(() => {
  ReactDOM.render(
    <input type="text" value={null} />,
    document.getElementById('monNoeudRacine')
  )
}, 1000);
```

### Alternatives aux composants contrôlés
Il est parfois assez fastidieux de maintenir les composants contrôlés, car il faut écrire un gestionnaire d'événement pour chaque 
possibilité de changement de données et gérer toutes les modifications de saisies par un composant React.  
Dans des situations comme la migration d'un projet vers React ou bien l'utilisation d'une bibliothèque non-React à l'intérieur d'un 
projet React, il peut être intéressant d'aller chercher sa solution ailleurs que dans les composants contrôlés.  

Pour ce genre de cas de figures, React met à disposition les [**composants non-contrôlés**](https://fr.reactjs.org/docs/uncontrolled-components.html), une technique alternative mais plus complexe pour implémenter les formulaires de saisie.

### Solution clé en main
Il existe des solutions répondant à tout vos besoins (validation des données, gestion de l'historique des champs visités, gestion de la 
soumission du formulaire etc.) : [**Formik**](https://jaredpalmer.com/formik) est l'une d'elle et fait parti des choix les plus populaires.

[**☝ Retour en haut de page**](#-découverte-de-react)
## Faire remonter l'état ([doc](https://fr.reactjs.org/docs/lifting-state-up.html))

Il arrive de manière assez régulière lorsque l'on manipule React que l'on puisse vouloir partager des données dynamiques entre différents composants.  
Dans ce cas bien précis, il est alors recommandé de faire remonter les états partagés au composant parent le plus proche.  

Pour illustrer cela nous allons mettre en place un calculateur permettant de prendre en entrée une température et d'afficher en sortie 
si cette température est suffisament élevée pour l'ébulition de l'eau. 
Ainsi, nous créons les deux composants suivants `<BoilingVerdict />` et `<Calculator />`. 

```
function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>L'eau bout</p>
    }

    return <p>L'eau ne bout pas.</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' }
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Saisissez la température en Celsius :</legend>
                <input value={temperature} onChange={this.handleChange} />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('app-remonterEtat')
)
```

### Ajouter un deuxième champ

Maintenant que nous avons mis en place le champ gérant la valeur de la température en celsius, nous allons mettre en place 
le champ pour la version Fahrenheit, les deux devront rester synchronisés !

Pour cela, reprennons le code du composant `<Calculator />` et utilisons le pour le nouveau composant `<TemperatureInput />` 
qui possédera une props `scale` permettant d'identifier l'unité de mesure lié au champ de formulaire.

Nous pouvons observer qu'à ce stade rien ne se synchronise, et qu'en plus nous avons perdu le composant `<BoilingVerdict />` 
que nous avons dû retirer de `<Calculator />` puisque celui-ci n'avait plus accès à la valeur de la température, actuellement 
enfermée dans `<TemperatureInput />`.

```
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>L'eau bout</p>
    }

    return <p>L'eau ne bout pas.</p>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' }
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }
    
    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Saisissez la température en Celsius :</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        )
    }
}

{/* <BoilingVerdict celsius={parseFloat(temperature)} /> */}

ReactDOM.render(
    <Calculator />,
    document.getElementById('app-remonterEtat')
)
```

### Écrire des fonctions de conversion

Nous passons rapidement l'étape de la création des fonctions de conversion permettant de passer d'une unité de mesure à l'autre. Ainsi que la fonction qui prendra en argument la température (type String) et une fonction de conversion à appeler. 

```
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

### Faire remonter l'état

Nous arrivons maintenant au sujet principal de ce chapitre. Comment faire en sorte de partager la même information entre deux composants ?  
En vérité c'est assez simple, il suffit d'extraire cette donnée, et de la placer dans l'ancêtre commun le plus proche. 

Ici `<Calculator />` étant l'ancêtre commun le plus proche des deux composants `<TemperatureInput />` alors ce sera lui qui deviendra 
la "source de vérité" pour la température des deux champs.  
Il aura alors comme fonction de fournir à ces deux composant des valeurs qui seront cohérentes l'une avec l'autre.  
Comme les props des composants `<TemperatureInput />` viennent du même composant `<Calculator />`, les deux champs seront donc toujours 
synchronisés. 

Pour réaliser cette opération, nous avons quelques modifications à effecuter : 
1. On supprime l'état `this.state.temperature` du composant `<TemperatureInput />`
2. De ce fait, on remplace `this.state.temperature` à l'intérieur du composant par `this.props.temperature`
3. Les props étant en lecture seule, nous devons transformer le composant `<TemperatureInput />` afin qu'il devienne un composant 
dit "contrôlé". Ainsi nous allons mettre en place deux nouvelles props `temperature` et `onTemperatureChange` qui seront fournies
par l'ancêtre commun. Nous devons donc modifier la méthode `handleChange()` du composant `<TemperatureInput />` qui n'appelera plus 
`this.setState()` mais `this.props.onTemperatureChange()`.
4. Nous pouvons aussi modifier la légende du fieldset en fonction la props `this.props.scale` passée au composant `<TemperatureInput />`
5. Créer deux nouvelles méthodes à l'intérieur du composant `<Calculator />` : `handleCelsiusChange` et `handleFahrenheitChange` 
qui mettront à jours les valeurs d'état du composant `temperature` et `scale`. Ensuite nous n'avons plus qu'à passer ces deux méthodes 
en props des composants `<TemperatureInput />` à l'intérieur de `onTemperatureChange` et le tour est joué. 

```
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
    
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Saisissez la température en {scaleNames[scale]} :</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' }
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.state.scale;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput 
                    scale="c" 
                    temperature={celsius} 
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput 
                    scale="f" 
                    temperature={fahrenheit} 
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </div>
        )
    }
}
```

Résumons ce qu'il se produit lorsque l'on édite l'un des champs : 
1. React appelle la fonction spécifiée dans l'attribut `onChange` de l'input. Ici dans notre cas c'est donc `handleChange` du composant `<TemperatureInput />`. 
2. Cette méthode appelle elle-même `this.props.onTemperatureChange` avec la valeur mise à jours.
3. Les props `scale`, `temperature` et `onTemperatureChange` étant fournis par son composant parent `<Calculator />`, l'information remonte
    handleCelsiusChange(temperature) {
4. On voit que dans le composant `<Calculator />`, la props `onTemperatureChange` appelle soit la méthode `handleCelsiusChange` si
l'input mis à jours est le champ correspondant à la valeur des celsius, soit la méthode `handleFahrenheitChange` si c'est l'input 
correspondant aux fahrenheit.
5. Ces méthodes ont pour but de mettre à jours les variables d'état du composant `<Calculator />` à l'aide de la fonction `this.setState()` 
et donc de rafraîchir le composant avec la nouvelle valeur du champ et l'unité du champ modifié.
6. React apelle donc la méthode `render()` afin de déterminer à quoi doit ressembler son UI. Ainsi, les deux fonctions de 
conversion sont appelées et les valeurs des deux champs sont recalculées en fonction de la température actuelle et de l'unité 
active. 
7. Par effet domino, React appelle ensuite la méthode `render()` des composants `<TemperatureInput />` afin de déterminer à quoi doit 
ressembler son UI. 
8. Puis il fera de même avec la méthode `render()` du composant `<BoilingVerdict />` en lui fournissant la valeur de la température 
en celsius dans ses props.
9. Enfin, ReactDOM met à jour le DOM avec le verdict d'ébullition et retranscrit les valeurs de champs souhaitées. Le champ que l'on vient de modifier 
reçoit sa valeur actuelle, le champ que l'on a pas touché reçoit la valeur convertie. 

### Ce qu'il faut retenir
Globalement ce qu'il faut retenir de ce chapitre c'est qu'il ne doit n'y avoir qu'une seule "source de vérité" pour toute donnée 
qui change dans une application React.  
Dans un premier temps nous pouvons définir l'état dans le composant qui en a besoin, puis au fur et à mesure que l'on se rend compte 
de la dépendance de cette donnée pour d'autres composants, nous devons faire remonter l'état dans l'ancêtre commun le plus proche.  
Il faut à tout prix éviter de tenter de synchroniser l'état de différents composants, c'est une source d'erreur assez conséquente. 
Nous devons donc privilégier les données qui se propagent du [**haut vers le bas**](https://fr.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down). 

Bien sûr, faire remonter un état afin de le synchroniser à travers plusieurs composant nécessite l'écriture de plus de ligne de code 
générique qu'avec une simple liaison de données bidirectionnelle, mais cela en vaut la peine. Les risques de bugs sont moindre et la 
traçabilité des bugs se produisant est simplifiée.

Lorsque quelque chose doit dériver des props ou de l'état d'un composant, cette chose ne devra pas figurer dans l'état du dit composant. 
Ici par exemple, nous n'avons pas stocké à la fois `celsiusValue` et `fahrenheitValue` mais tout simplement la combinaison `scale` et 
`temperature`.  
La valeur de l'autre champ peut toujours être mise à jours à l'aide de la méthode `render()` du composant `<Calculator />` et de ces 
données.  
Ça nous permet aussi de réaliser des traitements sur le second champs tout en sauvegardant la valeur saisie par l'utilisateur. 

Si un bug est constatable dans l'UI généré par React, nous pouvons utiliser les [**outils de développement React**](https://github.com/facebook/react/tree/master/packages/react-devtools) afin d'examiner les props et de parcourir l'arborescence des composant afin de déterminer l'origine du 
composant responsable de la mise à jour de l'état qui amène au bug. 

[**☝ Retour en haut de page**](#-découverte-de-react)
## Composition ou héritage ([doc](https://fr.reactjs.org/docs/composition-vs-inheritance.html))

En React il est déconseillé d'utiliser l'héritage, si le besoin se fait ressentir d'utiliser des fonctionnalités sans rapport avec 
l'interface utilisateur entre les composants il est conseillé d'extraire ces fonctionnalités dans un module JavaScript séparé.  
Les composants pourront alors importer cette fonction / objet ou classe sans avoir à l'étendre. 

La raison pour laquelle on peut se passer du système d'héritage offert par le JavaScript est que React vient avec un puissant 
modèle de composition. Nous allons voir maintenant différentes problématiques et nous chercherons à les résoudres à l'aide de 
la composition. 

### Délégation de contenu

Il arrive que certains composant ne connaissent pas leurs enfants à l'avance. Par exemple, des composants comme les `Sidebar` 
ou encore les fenêtre modale `Dialog` qui représentent des blocs génériques. 

Pour de tels composants il est conseillé d'utiliser la prop spéciale `props.children`. Cette props permet de passer directement 
les éléments enfants dans la sortie.  
Ainsi, à l'intérieur des autres composant nous pourront passer des enfants quelconques en imbriquant le JSX. 

```
function FancyBorder(props) {
  return (
    <div className={"Fancyborder FancyBorder-" + props.color}>
      {props.children}
    </div>
  )
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Bienvenue
      </h1>
      <p className="Dialog-message">
        Merci de visiter notre vaisseau spatiale (wsh) !
      </p>
    </FancyBorder>
  )
}
```

Tout ce qui va se trouver dans la balise JSX `<FancyBorder>` va se retrouver inclus dans la prop `children` est transmis au composant
`<FancyBorder />`. Puisque `<FancyBorder />` utilise `props.children` à l'intérieur d'une balise div, les éléments passées apparaissent 
dans la sortie finale. 

Il arrive parfois que nous ayons besoin de plusieurs "trous" dans votre composant. Dans ce cas-là, nous pouvons créer notre propre 
convention au lieu d'utiliser childre. 

```
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

Ici le traitement des composants `<Contacts />` et `<Chat />` peut paraître étrange mais cela est tout simple. Nous pouvons passer 
en props tout un tas d'élément, y compris de simples objets comme des composants.  
Il n'y a aucune limite à ce que l'on peut passer en props à l'intérieur de React. 

### Spécialisation

Parfois nous pouvons voir nos composants comme des cas particulier d'autres composants, et on pourrait être tenté de tout simplement 
créer un composant qui étend ces composants. Par exemple, nous pourrions avoir un composant `<WelcomeDialog />` qui serait un cas 
particulier du composant `<Dialog />`.
Ici encore, il est conseillé d'utiliser la composition plutôt que l'héritage. Un composant "spécialisé" utilisera donc un composant 
plus "générique" et le configure grâce aux props.

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Bienvenue"
      message="Merci de visiter notre vaisseau spatial !" />
  );
}
```

La composition fonctionne tout aussi bien avec les composants à base de classe, voici ici un exemple encore plus complet : 

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Programme d'exploration de Mars"
              message="Comment devrions-nous nous adresser à vous ?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Inscrivez-moi !
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Bienvenue à bord, ${this.state.login} !`);
  }
}
```