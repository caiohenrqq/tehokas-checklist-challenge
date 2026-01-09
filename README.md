# Tehokas | Checklist (Kanban) em Laravel e Inertia.js

## Sobre o Projeto

Este é um sistema de gerenciamento de tarefas (Kanban) moderno e interativo.

## 🛠 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- PHP com Laravel 12  
- React com Inertia.js e JavaScript  
- Framer Motion  
- SQLite  
- TailwindCSS & Shadcn/UI  

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

## Opção 1: Instalação Automática (Via Makefile)

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
 
### Parar o Projeto

```
make stop
```

## Opção 2: Manual com Laravel Sail (Docker)

Recomendado para Windows (PowerShell) ou sem Make.

Se você está no Windows e não usa WSL, use estes comandos no PowerShell.

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

# Gera chave e roda migrações dentro do container
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
```

### Inicie o Frontend

```
./vendor/bin/sail npm run dev
```

### Acesso

Acesse em: http://localhost
```
