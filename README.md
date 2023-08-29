# Desafio The Alfred

---
<div align="center">
  <img src="src/assets/images/logo.png" alt="Logo"  height="100px">
</div>

---

### Pré Requisitos

node v18 ou superior
yarn

### Rodando localmente

```bash
git clone https://github.com/paulosdgr/desafio-the-alfred-client
cd desafio-the-alfred-client
yarn
yarn serve
```

---

### Rodando os testes

```bash
yarn test
```

---

### Qualidade do Código
A qualidade do código é mantida utilizando Prettier em conjunto com ESLint.
- **Prettier:** possibilita manter o código formatado de forma consistente,
- **ESLint:** possibilita manter o código consistente com regras de linting

---

### Estilização
Utilizei SASS em conjunto do padrão BEM CSS.

---

### Páginas e Componentes:

**Páginas**

Characters:
- Exibe os 20 primeiros personagens da API da Marvel.
- Permite ordenação por nome do personagem.
- Oferece campo de busca para filtrar por nome.
- Possui opção para mostrar apenas personagens favoritos.
- Permite favoritar/desfavoritar até 5 personagens.

Character Detail:
- Exibe informações detalhadas de um personagem específico.
- Mostra os últimos 10 quadrinhos lançados pelo personagem.
<br /> <br />

**Componentes Compartilhados**

- Switch
- Search
- Checkbox

---

### Bônus

- A paginação foi aplicada
- Os favoritos persistem no LocalStorage
