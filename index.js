const express = require('express');

const server = express();

server.use(express.json());

const projetos = []; //array para armazenar informações

server.use((request, response, next) => { //global - retorna Porta e URL chamadas
  console.time('Request');
  console.log(`Método: ${request.method}, URL: ${request.url}`);

  next();

  console.timeEnd('Request');
});

//Middleware que retorna o número de requisições
function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

// Middleware que checa se um projeto de dado id existe
function checkProjetoExiste(request, response, next) {
  const { id } = request.params;
  const projeto = projetos.find(p => p.id == id);

  if (!projeto) {
    return response.status(400).json({ error: 'Projeto não encontrado' });
  }

  return next();
}

server.get('/projetos', (request, response) => { //Lista projetos cadastrados
  return response.json(projetos);
});

server.post('/projetos', (request, response) => {//Salva novo projeto
  const { id, title } = request.body;
  
  const projeto = {
    id,
    title,
    tasks: []
  };

  projetos.push(projeto);

  return response.json(projeto);
});

server.put('/projetos/:id', checkProjetoExiste, (request, response) =>{//Altera Título fdo projeto
  const { id } = request.params;
  const { title } = request.body

  const projeto = projetos.find(p => p.id == id);

  projeto.title = title;

  return response.json(projeto);
});

server.delete('/projetos/:id', checkProjetoExiste, (request, response) => {//deleta projeto pelo id
  const { id } = request.params;

  const projetoIndex = projetos.findIndex(p => p.id == id);

  projetos.splice(projetoIndex, 1);

  return response.send();
});

server.post('/projetos/:id/tarefas', checkProjetoExiste, (request, response) => {//adiciona tarefas a um projeto
  const { id } = request.params;
  const { title } = request.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.tasks.push(title);

  return response.json(projeto);
});

server.listen(3331);