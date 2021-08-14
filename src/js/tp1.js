'use strict';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: ["Toto", "Titi", "Tata"], inputValue: "" };

        this.addItemToList = this.addItemToList.bind(this);
        this.updatedValue = this.updatedValue.bind(this);
    }

    addItemToList() {
        this.setState((state) => ({ list.push(state.inputValue) }) );
    }

    updatedValue(e) {
        const tempValue = e.target.value;
        this.setState((state) => ({inputValue: state.inputValue + tempValue }));
        console.log(this.state);
    }

    render() {
        const listItems = this.state.list.map((todo, id) => <li key={id}>{todo}</li>);

        return (
            <div>
                <ul>
                    {listItems}
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