import React, { Component } from "react";

class Body extends Component {
  constructor(props) {
    super();
    this.state = JSON.parse(
      localStorage.getItem("empty_list_full_reactjs")
    ) || {
      dia_atual: null,
      list_names: [],
      listas: [
        {
          name: "nome",
          age: "idade",
          description: ["descricao"]
        }
      ]
    };
  }

  componentDidMount() {
    this.insertElementOnList("André", 18, "Eu sou um developer");
  }

  insertElementOnList() {
    let nome = document.getElementById("create_input").value;
    let listElement = {
      name: nome,
      description: []
    };
    this.setState(
      {
        listas: this.state.listas.concat(listElement)
      },
      () => {
        this.insertLists();
      }
    );
  }

  deleteElement = (num, numero) => {
    let copy_state = this.state;

    copy_state.listas[numero].description.splice(num, 1);
    this.setState(
      {
        listas: copy_state.listas
      },
      () => {
        console.log(copy_state.listas[0]);
      }
    );
  };

  insertTaskOnList = num => {
    let copy_state = this.state;
    let copy_item = this.state.listas[num.idx];
    let input_value = document.getElementById(`input${num.idx}`);

    copy_item.description.push(input_value.value);
    copy_state.listas[num.idx].description = copy_item.description;

    input_value.value = "";

    this.setState({
      listas: copy_state.listas
    });
  };

  getDescriptions = numero => {
    return this.state.listas[numero].description.map((value, idx) => {
      return (
        <p>
          {value}
          <button
            onClick={() => {
              this.deleteElement(idx, numero);
            }}
          >
            excluir
          </button>
        </p>
      );
    });
  };

  deleteList = num => {
    let copy_state = this.state;
    copy_state.listas.splice(num, 1);

    this.setState({
      listas: copy_state.listas
    });
  };

  insertLists = () => {
    return this.state.listas.map((value, idx) => {
      return (
        <li key={idx}>
          <h1>{value.name}</h1>
          <p>{this.getDescriptions(idx)}</p>
          <input id={`input${idx}`} />
          <button
            onClick={() => {
              this.insertTaskOnList({ idx });
            }}
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              this.deleteList({ idx });
            }}
          >
            Deletar
          </button>
        </li>
      );
    });
  };

  saveToStorage = () => {
    localStorage.setItem("empty_list_full_reactjs", JSON.stringify(this.state));
  };

  render() {
    return (
      <div>
        <h1>Seja bem vindo!</h1>
        <input id="create_input" />
        <button
          onClick={() => {
            this.insertElementOnList();
          }}
        >
          Criar Lista
        </button>
        <ul>{this.insertLists()}</ul>
      </div>
    );
  }
}

export default Body;
