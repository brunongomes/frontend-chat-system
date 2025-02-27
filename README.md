# Chat Frontend

Aplicação Angular para sistema de mensagens em tempo real com autenticação e design responsivo.

---

## 📝 Sobre  
Interface de usuário para chat, usando Angular com TypeScript. Inclui autenticação, envio de mensagens e layout adaptável.

---

## 🚀 Features  
- **Autenticação**: Login/Registro com redirecionamento  
- **Chat em tempo real**: Envio de mensagens com histórico  
- **Design responsivo**: Funciona em dispositivos móveis  
- **Guards de segurança**: Proteção de rotas via Angular Router
---

## 🛠 Setup  
### Pré-requisitos  
- Node.js 16+  
- npm

### Passo a passo  
1. **Clonar o repositório**  
   ```
   git clone https://github.com/brunongomes/frontend-chat-system
   cd chat-frontend
   ```

2. **Instalar dependências**  
   ```
   npm install
   ```

3. **Configurar variáveis de ambiente**  
   Configure o arquivo `environment.ts` com:  
   ```
   const port = 9007;

   export const environment = {
      production: false,
      apiUrl: `http://localhost:${port}`,
      port: port,
      wsUrl: `ws://localhost:${port}`
   };
   ```

4. **Iniciar o servidor**  
   ```
   npm start
   ```

---

## 📐 Arquitetura  
### Estrutura do Projeto  
```
src/
├── app/
│   ├── components/      # Componentes standalone
│   ├── guards/          # Guards de segurança
│   ├── services/        # Serviços de negócios
│   ├── routing/         # Configuração de rotas
│   └── app-routing.module.ts # Roteamento principal
└── assets/              # Recursos estáticos
```

### Componentes Principais  
1. **Angular Router**: Navegação e lazy loading  
2. **Guards**: Proteção de rotas via `CanActivate`  
3. **Services**: Gerenciamento de estado e comunicação com API    
4. **CSS**: Estilização responsiva com flexbox/grid  

---

## 🔍 Funcionalidades Principais  
| Funcionalidade       | Descrição                          |
|----------------------|------------------------------------|
| Autenticação         | Login/Registro com redirecionamento |
| Chat em tempo real   | Envio de mensagens com histórico   |
| Design responsivo    | Layout adaptável para todos os tamanhos |
| Lazy Loading         | Carregamento sob demanda de módulos |
| Guards de segurança  | Proteção de rotas via Angular Router |

---

## 📜 License  
Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---