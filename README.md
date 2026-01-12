# Kanban c/ drag-and-drop em Laravel & Inertia.js. 

> Deploy pela Railway: https://kanban-board.up.railway.app/

![Recording 2026-01-11 at 14 31 29](https://github.com/user-attachments/assets/d4f482b3-e769-4da0-83ae-66c1bbfcd63f)

## 🛠 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- PHP com Laravel 12  
- React com Inertia.js e JavaScript  
- [Framer Motion](https://github.com/motiondivision/motion)
- SQLite  
- TailwindCSS & Shadcn/UI
- Drag and drop com [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)

<img width="1347" height="550" alt="{310636F3-8001-453B-9D4D-D17C281E7C23}" src="https://github.com/user-attachments/assets/3ccd42d9-65a0-49bd-89dc-f4ad945e6705" />

## 🚩 Maior Dificuldade Técnica e Como Superei

> Sem a prevenção de erros do TypeScript, falhas de digitação só eram notadas em runtime. Superei a falta de autocomplete mantendo os arquivos de origem abertos lado a lado (split view) na IDE, criando uma referência visual constante que eliminou a necessidade de troca de contexto, ganhando de volta minha produtividade de sempre.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

**OBRIGATÓRIO:** Baixe e instale o Docker.

### 🐳 Configurando Docker no Windows

Se você está no Windows e ainda não tem o Docker:

1. Baixe e instale o Docker Desktop.
2. Durante a instalação, garanta que a opção **Use WSL 2** esteja marcada (recomendado).

## 🔐 Credenciais de Acesso

Após rodar as migrações, utilize os seguintes dados para login:

- **E-mail:** consultor@tehokas.com  
- **Senha:** password  

**Nota:** Você também pode criar uma nova conta registrando-se diretamente na aplicação.

## Opção 1: Instalação Automática (Makefile)

Recomendado para Linux, Mac e WSL.

Se você possui o `make` instalado (padrão em Linux/Mac), todo o processo é automático.

### Instalação Completa

Configura ambiente, instala dependências, gera chaves e roda migrações.

```
make install
```

### Rodar o Projeto

Inicia o Sail e o servidor de desenvolvimento do frontend.

```
make run
```

## Opção 2: Manual

Recomendado para Windows sem WSL.

### Clone e Instale as dependências

```
# Instala dependências do PHP via container temporário
docker run --rm `
    -v "${PWD}:/var/www/html" `
    -w /var/www/html `
    laravelsail/php84-composer:latest `
    composer install --ignore-platform-reqs

# Instala dependências do Node
npm install
```

**Nota:** Se estiver no Linux/Mac e preferir este método, troque `${PWD}` por `$(pwd)` e as crases `` ` `` por barras invertidas `\`.

### Inicie o projeto

```
./vendor/bin/sail up -d
```

### Setup Final

```
# Copia o env
cp .env.example .env

# Cria o arquivo do banco SQLite
touch database/database.sqlite

# Gera chave e roda migrações dentro do container
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
```

### Inicie o Frontend

```
./vendor/bin/sail npm run dev
```

### Acesso

```
http://localhost
```
