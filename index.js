//ATENÇÃO NÃO ESQUEÇA DE INSTALAR AS BIBLIOTECAS SQLITE3 E SEQUELIZE
//comando de instalação

// npm install sqlite3 sequelize

// Importando as biliotecas
const{ Sequelize, Model, DataTypes} = require("sequelize");
//Abrindo conexão com o Banco de dados ou criando um novo caso não exista
const sequelize = new Sequelize({
  dialect: "sqlite",
storage: "empresa.sqlite"
  });

// definindo a classe setor

class Setor extends Model{
  static init(sequelize){
    super.init({
      idsetor:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      
      },
      nome:{
        type:DataTypes.STRING(40),
        allowNull:false
        
      },
      ramal:{
        type:DataTypes.STRING(10),
        allowNull:false
      },
      email:{
        type:DataTypes.STRING(30)
      }
    }, {sequelize, modelName: 'setor', tableName: 'setores'})
  }
}

//inicialização do modelo create setor
Setor.init(sequelize);

class Funcionario extends Model{
  static init(sequelize){
    super.init({
      matricula:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      idsetor:{
        type: DataTypes.INTEGER,
        references:{
          model: Setor,
          key: 'idsetor'}
        },
        nome:{
          type: DataTypes.STRING(60),
          allowNull: false
        },
        nascimento:{
          type: DataTypes.DATE
        },
        telefone:{
          type: DataTypes.STRING(15)
        }
      
    },{sequelize, modelName: 'funcionario', tableName:'funcionarios'})
  }
}

Funcionario.init(sequelize);

//sincronismo
(async () => {
  await sequelize.sync({force: true});
  //Usando o CREATE
  const setor_create = await Setor.create({nome: "Financeiro", ramal: "2134", email: "financeiro@emapresa.com"});
  const setor_create_S = await Setor.create({nome: "Secretaria", ramal: "2135", email: "secretaria@emapresa.com"});
  const setor_create_P = await Setor.create({nome: "Portaria", ramal: "2136", email: "portaria@emapresa.com"});
  const setor_create_C = await Setor.create({nome:"Contabilidade", ramal:"2137", email:"contabilidade@empresa.com"})
  const setor_create_D = await Setor.create({nome:"Dieretoria", ramal:"2138", email:"diretoria@empresa.com"})
  const setor_create_RH = await Setor.create({nome:"Recursos Humanos", ramal:"2139", email:"recursoshumanos@empresa.com"})

  //READ - Listar objetos
  const setores_listar = await Setor.findAll(); // findAll cria um array da minha tabela setor

  console.log("Lista de Setores: \n", JSON.stringify(setores_listar, null, 2), "\n\n"); //ler o arquivo sqlite

  //UPDATE - Atualizar Objetos

  const setor_chave = await Setor.findByPk(3); // so vai pegar os dados do setor 3
  setor_chave.nome = "Estoque";
  const resultado = await setor_chave.save();
  console.log(resultado);

  // Listando objetos após atualização
  const setores_update = await Setor.findAll(); // findAll cria um array da minha tabela setor
  console.log("Lista de Setores Atualizada: \n", JSON.stringify(setores_update, null, 2), "\n\n");

  // DELETE - Deletar Objetod
  const setor_delete = await Setor.findByPk(1);
  setor_delete.destroy();

    // Listando objetos após a exclusão
  const setores_exclusao = await Setor.findAll(); // findAll cria um array da minha tabela setor
  console.log("Lista de Setores após a Exclusão: \n", JSON.stringify(setores_exclusao, null, 2), "\n\n");

  //Exclusão do setor Contabilidade
  const setor_delete_Contabilidade = await Setor.findByPk(4);
  setor_delete_Contabilidade.destroy();
  
  //Listando após excluir o setor contabilidade
  const setores_exclusao_C = await Setor.findAll();
  console.log("Lista de Setores após a Exclusão do Setor Contabilidade: \n", JSON.stringify(setores_exclusao_C, null, 2), "\n\n");

    //UPDATE - Atualizar o setor de Recursos Humanos para Departamento Pessoal

  const setor_chave_DP = await Setor.findByPk(6); 
  setor_chave_DP.nome = "Departamento Pessoal";
  const resultado_2 = await setor_chave_DP.save();
  console.log(resultado_2);

  // Listando objetos após atualização de Recursos Humanos para Departamento Pessoal
  const setores_update_2 = await Setor.findAll(); // findAll cria um array da minha tabela setor
  console.log("Lista de Setores Atualizada de 'RH' para 'Departamento Pessoal': \n", JSON.stringify(setores_update_2, null, 2), "\n\n");
  
  //Create funcionario

  const funcionario_create = await Funcionario.create({idsetor: 2, nome:"Ana", nascimento: "1978-04-12", telefone:"01219219"});
    const funcionario_create1 = await Funcionario.create({idsetor: 3, nome:"Ivo", nascimento: "2000-12-01", telefone:"07280921"});
    const funcionario_create2 = await Funcionario.create({idsetor: 2, nome:"Otto", nascimento: "1987-02-07", telefone:"06924324"});
    const funcionario_create3 = await Funcionario.create({idsetor: 3, nome:"Carina", nascimento: "1990-09-09", telefone:"02932176"});

  const funcionarios_listar = await Funcionario.findAll(); // findAll cria um array da minha tabela setor
  console.log("Lista de Funcionários: \n", JSON.stringify(funcionarios_listar, null, 2), "\n\n");
})();

