import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Produtos extends Component {
  render() {
    return(
      <View>
        <Text> ID: {this.props.id}, Nome: {this.props.nome}, Fabricante: {this.props.fabricante}</Text>
        <TouchableHighlight onPress={ () => {this.props.excluir(this.props.id)} }>
          <Text> Excluir</Text>
        </TouchableHighlight>

        <Text></Text>
      </View>

    )
  }
}