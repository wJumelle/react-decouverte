'use strict';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: ["Toto", "Titi", "Tata"], inputValue: "" };

        this.addItemToList = this.addItemToList.bind(this);
        this.updatedValue = this.updatedValue.bind(this);
    }

    addItemToList() {
        this.setState((state) => ({ list: [...state.list, state.inputValue] }));
    }

    updatedValue(e) {
        this.setState({inputValue: e.target.value});
    }

    render() {
        const listItems = this.state.list.map((todo) => <li key={todo.toString()}>{todo}</li>);

        return (
            <div>
                <ul>
                    {listItems}
                </ul>
                <input id="newItem" type="text" value={this.state.value} onChange={this.updatedValue} />
                <button onClick={this.addItemToList}>Ajouter l'élément à la liste</button>
            </div>
        )
    }
}

ReactDOM.render(
    <ToDoList />,
    document.getElementById('app-todolist')
);