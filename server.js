const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados simulados
let categorias = [
    { id: 1, nome: "Eletrônicos" },
    { id: 2, nome: "Roupas" },
    { id: 3, nome: "Acessórios" }
];

let produtos = [
    {
        id: 1,
        nome: "Smartphone Modelo X",
        descricao: "Um smartphone avançado com câmera de alta resolução.",
        preco: 599.99,
        categoria_id: 1
    },
    {
        id: 2,
        nome: "Notebook Ultraleve",
        descricao: "Um notebook fino e leve com tela de alta definição.",
        preco: 999.99,
        categoria_id: 1
    },
    {
        id: 3,
        nome: "Camiseta de Algodão",
        descricao: "Uma camiseta confortável feita de algodão.",
        preco: 19.99,
        categoria_id: 2
    }
];

let avaliacoes = [
    { id: 1, comentario: "Ótimo smartphone!", classificacao: 5 },
    { id: 2, comentario: "Funciona muito bem.", classificacao: 4 },
    { id: 3, comentario: "Leve e rápido.", classificacao: 5 },
    { id: 4, comentario: "Boa qualidade.", classificacao: 4 }
];

// Operações CRUD para Categorias
app.get('/categorias', (req, res) => {
    res.json(categorias);
});

// Operação para listar uma categoria específica por ID
app.get('/categorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
        res.status(404).json({ error: "Categoria não encontrada" });
    } else {
        res.json(categoria);
    }
});

app.post('/categorias', (req, res) => {
    const novaCategoria = req.body;
    novaCategoria.id = categorias.length + 1;
    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
});

app.put('/categorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const categoriaAtualizada = req.body;
    const categoriaExistente = categorias.find(c => c.id === id);

    if (!categoriaExistente) {
        res.status(404).json({ error: "Categoria não encontrada" });
    } else {
        categoriaExistente.nome = categoriaAtualizada.nome;
        res.json(categoriaExistente);
    }
});

app.delete('/categorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const categoriaIndex = categorias.findIndex(c => c.id === id);

    if (categoriaIndex === -1) {
        res.status(404).json({ error: "Categoria não encontrada" });
    } else {
        categorias.splice(categoriaIndex, 1);
        res.status(204).send();
    }
});

// Operações CRUD para Produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Operação para listar um produto específico por ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        res.status(404).json({ error: "Produto não encontrado" });
    } else {
        res.json(produto);
    }
});

app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoAtualizado = req.body;
    const produtoExistente = produtos.find(p => p.id === id);

    if (!produtoExistente) {
        res.status(404).json({ error: "Produto não encontrado" });
    } else {
        produtoExistente.nome = produtoAtualizado.nome;
        produtoExistente.descricao = produtoAtualizado.descricao;
        produtoExistente.preco = produtoAtualizado.preco;
        produtoExistente.categoria_id = produtoAtualizado.categoria_id;
        res.json(produtoExistente);
    }
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        res.status(404).json({ error: "Produto não encontrado" });
    } else {
        produtos.splice(produtoIndex, 1);
        res.status(204).send();
    }
});

// Operações CRUD para Avaliações 
app.get('/avaliacoes', (req, res) => {
    res.json(avaliacoes);
});

app.get('/avaliacoes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const avaliacao = avaliacoes.find(a => a.id === id);

    if (!avaliacao) {
        res.status(404).json({ error: "Avaliação não encontrada" });
    } else {
        res.json(avaliacao);
    }
});

app.post('/avaliacoes', (req, res) => {
    const novaAvaliacao = req.body;
    novaAvaliacao.id = avaliacoes.length + 1;
    avaliacoes.push(novaAvaliacao);
    res.status(201).json(novaAvaliacao);
});

app.put('/avaliacoes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const avaliacaoAtualizada = req.body;
    const avaliacaoExistente = avaliacoes.find(a => a.id === id);

    if (!avaliacaoExistente) {
        res.status(404).json({ error: "Avaliação não encontrada" });
    } else {
        avaliacaoExistente.comentario = avaliacaoAtualizada.comentario;
        avaliacaoExistente.classificacao = avaliacaoAtualizada.classificacao;
        res.json(avaliacaoExistente);
    }
});

app.delete('/avaliacoes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const avaliacaoIndex = avaliacoes.findIndex(a => a.id === id);

    if (avaliacaoIndex === -1) {
        res.status(404).json({ error: "Avaliação não encontrada" });
    } else {
        avaliacoes.splice(avaliacaoIndex, 1);
        res.status(204).send();
    }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
