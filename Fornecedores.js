import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, Modal } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fornecedorContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
  },
  fornecedorText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  acaoBotao: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  acaoTexto: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

const CadastroFornecedor = ({ onCadastro }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  
  const handleCadastro = () => {
    const fornecedor = { id: Date.now(), nome, endereco, contato, categoria };
    onCadastro(fornecedor);
    setNome('');
    setEndereco('');
    setContato('');
    setCategoria('');
  };
  
  return (
    <View style={styles.fornecedorContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome do fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const ListaFornecedores = ({ fornecedores, onDelete, onEdit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editEndereco, setEditEndereco] = useState('');
  const [editContato, setEditContato] = useState('');
  const [editCategoria, setEditCategoria] = useState('');

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja excluir este fornecedor?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => onDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setEditNome(fornecedor.nome);
    setEditEndereco(fornecedor.endereco);
    setEditContato(fornecedor.contato);
    setEditCategoria(fornecedor.categoria);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveEdit = () => {
    const updatedFornecedores = fornecedores.map((fornecedor) => {
      if (fornecedor.id === fornecedorSelecionado.id) {
        return {
          ...fornecedor,
          nome: editNome,
          endereco: editEndereco,
          contato: editContato,
          categoria: editCategoria,
        };
      }
      return fornecedor;
    });
    onEdit(updatedFornecedores);
    setModalVisible(false);
  };

  return (
    <ScrollView>
      {fornecedores.map((fornecedor) => (
        <View key={fornecedor.id} style={styles.fornecedorContainer}>
          {fornecedor.imagem && <Image source={{ uri: fornecedor.imagem }} style={styles.imagem} />}
          <View>
            <Text style={styles.fornecedorText}>{fornecedor.nome}</Text>
            <Text style={styles.fornecedorText}>{fornecedor.endereco}</Text>
            <Text style={styles.fornecedorText}>{fornecedor.contato}</Text>
            <Text style={styles.fornecedorText}>{fornecedor.categoria}</Text>
            <View style={styles.acoesContainer}>
              <TouchableOpacity style={[styles.acaoBotao, { backgroundColor: '#dc3545' }]} onPress={() => handleDelete(fornecedor.id)}>
                <Text style={styles.acaoTexto}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.acaoBotao, { backgroundColor: '#007bff' }]} onPress={() => handleEdit(fornecedor)}>
                <Text style={styles.acaoTexto}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.fornecedorText}>Editar fornecedor</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do fornecedor"
              value={editNome}
              onChangeText={setEditNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              value={editEndereco}
              onChangeText={setEditEndereco}
            />
            <TextInput
              style={styles.input}
              placeholder="Contato"
              value={editContato}
              onChangeText={setEditContato}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoria"
              value={editCategoria}
              onChangeText={setEditCategoria}
            />
            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleSaveEdit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545', marginTop: 10 }]} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const App = () => {
  const [fornecedores, setFornecedores] = useState([]);

  const handleCadastroFornecedor = (fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
  };

  const handleExcluirFornecedor = (id) => {
    const updatedFornecedores = fornecedores.filter(fornecedor => fornecedor.id !== id);
    setFornecedores(updatedFornecedores);
  };

  const handleEditarFornecedor = (updatedFornecedores) => {
    setFornecedores(updatedFornecedores);
  };

  return (
    <View style={styles.container}>
      <CadastroFornecedor onCadastro={handleCadastroFornecedor} />
      <ListaFornecedores fornecedores={fornecedores} onDelete={handleExcluirFornecedor} onEdit={handleEditarFornecedor} />
    </View>
  );
};

export default App;
