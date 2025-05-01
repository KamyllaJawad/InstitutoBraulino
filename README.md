# Instituto Braulino Website

Site institucional do Instituto Braulino de Souza Nascimento, uma organização sem fins lucrativos dedicada ao desenvolvimento social e comunitário.

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para tema consistente)
- JavaScript (ES6+)
- Bootstrap 5.3
- Node.js (para servidor de imagens)
- Font Awesome 6.0
- Google Fonts (Playfair Display e Poppins)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/instituto-braulino.git
cd instituto-braulino
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
node server.js
```

O site estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
instituto-braulino/
├── assets/
│   ├── imgs/
│   │   ├── projetos/       # Imagens dos projetos
│   │   ├── passaro.svg     # Logo do instituto
│   │   └── hero_section.png
│   └── estatuto.pdf
├── css/
│   └── style.css          # Estilos principais
├── js/
│   └── script.js          # JavaScript principal
├── node_modules/
├── .gitignore
├── index.html             # Página principal
├── package.json
├── package-lock.json
├── README.md
└── server.js             # Servidor Node.js para galeria de imagens
```

## 🎨 Paleta de Cores

- Principal: `#ae1a6e`
- Secundária: `#644d4b`
- Destaque: `#8e7343`
- Clara: `#c9b9b8`

## 📱 Recursos e Funcionalidades

- Design responsivo para todos os dispositivos
- Navegação suave com scroll animado
- Galeria de projetos com carregamento dinâmico
- Modal de galeria com carrossel e miniaturas
- Animações suaves de transição
- Integração com Google Maps
- Links diretos para WhatsApp e e-mail
- Visualização de documentos PDF

## 🖼️ Gerenciamento de Imagens

Para adicionar novas imagens aos projetos:

1. Crie uma pasta com o nome do projeto em `assets/imgs/`
2. Adicione as imagens na pasta
3. O sistema carregará automaticamente as imagens na galeria

Formatos suportados:
- Imagens: .jpg, .jpeg, .png
- Documentos: .pdf

## 🔄 Atualização de Conteúdo

Para atualizar o conteúdo do site:

1. Textos: Edite diretamente no arquivo `index.html`
2. Imagens: Adicione/substitua na pasta `assets/imgs/`
3. Projetos: Atualize o array `projectFolders` em `script.js`

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktops (1200px+)
- Tablets (768px - 1199px)
- Smartphones (320px - 767px)

## ⚙️ Configuração do Servidor

O servidor Node.js (`server.js`) gerencia:
- Listagem de imagens dos projetos
- Servir arquivos estáticos
- Manipulação de rotas

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ✨ Créditos

Desenvolvido por [Kamylla Jawad](https://kjawad.netlify.app/) 