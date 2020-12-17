import React, { Component } from "react";
import "./styles.css";
//https://api.github.com/users/andrelara2002/repos
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
          name: "Esta é uma lista",
          description: ["Exclua ela para começar!"]
        }
      ]
    };
  }

  componentDidMount() {}

  insertElementOnList() {
    let nome = document.getElementById("create_input").value;
    if (nome != "") {
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
          document.getElementById("create_input").value = "";
          this.saveToStorage();
        }
      );
    } else {
      alert("Insira um Nome para a Lista");
    }
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
        this.saveToStorage();
      }
    );
  };

  insertTaskOnList = num => {
    let copy_state = this.state;
    let copy_item = this.state.listas[num.idx];
    let input_value = document.getElementById(`input${num.idx}`);

    copy_item.description.push(input_value.value);
    copy_state.listas[num.idx].description = copy_item.description;

    this.setState(
      {
        listas: copy_state.listas
      },
      () => {
        this.saveToStorage();
        input_value.value = "";
      }
    );
  };

  getDescriptions = numero => {
    return this.state.listas[numero].description.map((value, idx) => {
      return (
        <p className="list_inside_element">
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
    copy_state.listas.splice(num.idx, 1);

    this.setState(
      {
        copy_state
      },
      () => {
        this.saveToStorage();
      }
    );
  };

  insertLists = () => {
    return this.state.listas.map((value, idx) => {
      return (
        <li className="list_inside" key={idx}>
          <h1>{value.name}</h1>
          <p>{this.getDescriptions(idx)}</p>
          <div className="input_task_session">
            <input id={`input${idx}`} placeholder="Insira uma nota" />
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
          </div>
        </li>
      );
    });
  };

  saveToStorage = () => {
    localStorage.setItem("empty_list_full_reactjs", JSON.stringify(this.state));
  };

  downloadFile = () => {
    const myData = this.state;

    const fileName = "my_notes_-_empty_list";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  setDataFromJson = value => {
    let copy_state = this.state;

    var files = value.files;
    var file = files[0];

    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {};

    let redero = reader.readAsText(file);
    console.log(redero.result);
  };

  render() {
    return (
      <div className="main">
        <div className="input_div">
          <h2>TITULO</h2>
          <input id="create_input" placeholder="Insira o título de sua lista" />
        </div>
        <button
          className="full_button"
          onClick={() => {
            this.insertElementOnList();
          }}
        >
          CRIAR LISTA
        </button>
        <ul>{this.insertLists()}</ul>
      </div>
    );
  }
}

export default Body;
