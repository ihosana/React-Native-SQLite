import React, {Component} from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Database from './src/database/Database';
import Produto from './src/model/Produto';
import Produtos from './src/components/Produtos';
import { DevSettings } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      fabricante: "",
      produtos: [],
    }

    this.produtos = []
    this.listarProdutos()
  }

  listarProdutos() {
    const db = new Database();
    db.listar().then(data => {
      this.setState({produtos: data})
    });
    
  }
  cadastrarProduto(nome, fabricante) {
    const produto = new Produto(nome, fabricante);
    const db = new Database();
    db.adicionar(produto);
    DevSettings.reload();
  }

  removerProduto(id) {
    const db = new Database();   
    db.deletar(id).then(data => {
      DevSettings.reload();
    });
  }

  render() {

    return(
      <View>
        <Text>Cadastro de Produtos</Text>

        <Text>Nome: </Text>
        <TextInput onChangeText={(nome)=> {this.setState({nome: nome})}}></TextInput>
        
        <Text>Fabricante: </Text>
        <TextInput onChangeText={(fabricante)=> {this.setState({fabricante: fabricante})}}></TextInput>

        <TouchableHighlight
          onPress = {() => {
            this.cadastrarProduto(this.state.nome, this.state.fabricante)
          }}
        >
          <Text>Inserir</Text>
        </TouchableHighlight>
        
        <Text></Text>
        <Text></Text>
        <Text>Lista de Produtos</Text>

        <ScrollView>
          {this.state.produtos.map( produto => (
            <Produtos key={produto.id} id={produto.id} nome={produto.nome} fabricante={produto.fabricante} excluir={this.removerProduto}></Produtos>
          ))} 
          
        </ScrollView>
      </View>

    )
  }
}