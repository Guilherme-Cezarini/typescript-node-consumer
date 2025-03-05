# TypeScript RabbitMQ Consumer

Este projeto é um consumer de mensagens do RabbitMQ escrito em TypeScript utilizando Node.js. As mensagens recebidas são armazenadas em um banco de dados MongoDB. O serviço é executado como um processo independente e espera que o RabbitMQ já esteja rodando.

## Requisitos

- Node.js (recomendado: versão mais recente LTS)
- npm ou yarn
- Docker e Docker Compose
- RabbitMQ rodando previamente

## Configuração

Antes de executar a aplicação, é necessário configurar as variáveis de ambiente. Um exemplo de configuração pode ser encontrado no arquivo `.env.example`.

Crie um arquivo `.env` baseado no `.env.example` e edite conforme necessário:

```sh
cp .env.example .env
```

## Como executar

1. Instale as dependências do projeto:

   ```sh
   npm install
   ```

2. Suba o MongoDB utilizando o Docker Compose:

   ```sh
   docker-compose up -d
   ```

3. Certifique-se de que o RabbitMQ já está rodando.
4. Execute a aplicação:

   ```sh
   npm run start
   ```

## Considerações

- A aplicação **não inicia o RabbitMQ**, ele deve estar rodando previamente.
- O MongoDB é iniciado via Docker Compose.
- Utilize o `.env` para definir as credenciais e conexões necessárias.


