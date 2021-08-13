'use strict';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [], inputValue: "" };

        this.addItemToList = this.addItemToList.bind(this);
    }

    addItemToList() {
        this.setState( list.push(document.getElementById));
    }

    updatedValue() {
        // this.setState({inputValue: this.value });
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Mon premier élément de liste</li>
                </ul>
                <input id="newItem" type="text" value="" onChange={this.updatedValue} />
                <button onClick={this.addItemToList}>Ajouter l'élément à la liste</button>
            </div>
        )
    }
}

ReactDOM.render(
    <ToDoList />,
    document.getElementById('app-todolist')
);