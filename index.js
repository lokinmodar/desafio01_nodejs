const express = require('express');

const server = express();

server.use(express.json());

const projetos = [
  {
    id: 1,
    title: 'proj0',
    tasks: []
  },
  { 
    id: 2,
    title: 'proj1',
    tasks: []
  },
  {
    id: 3,
    title: 'proj2',
    tasks: []
  }
];

  server.use((request, response, next) => { //global
    console.time('Request');
    console.log(`Método: ${request.method}, URL: ${request.url}`);
  
    next();
  
    console.timeEnd('Request');
  });

server.get('/projetos', (request, response) => {
  //const nome = request.query.nome; 

  //console.log(`${nome}`);
  return response.json(projetos);
});

server.get('/projetos/:id', (request, response) => {
  const { id } = request.params; 

  return response.json(projetos[id]);
});

server.listen(3331);