# 🚀 Deploy no GitHub Pages - Instruções

## ✅ Tudo está pronto! 

A configuração automática foi realizada. Agora você só precisa seguir estes passos:

## 📋 Passo 1: Criar repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"+"** > **"New repository"**
3. **Nome do repositório**: `Convite-de-Aniversario-com-Borboletas`
4. **Descrição** (opcional): "Convite de Aniversário com Borboletas - React + Vite"
5. Escolha **Public** (necessário para GitHub Pages grátis)
6. **NÃO** inicialize com README (já temos um)
7. Clique em **"Create repository"**

## 💻 Passo 2: Fazer Push do código (abra o PowerShell)

```powershell
# Navegue até a pasta do projeto
cd "C:\Users\Endrew\Desktop\Convite de Aniversário com Borboletas"

# Inicialize o git (se não estiver já inicializado)
git init

# Configure seu email e nome no git (se for primeira vez)
git config user.email "seu_email@gmail.com"
git config user.name "Seu Nome"

# Adicione todos os arquivos
git add .

# Crie o commit inicial
git commit -m "Projeto inicial: Convite de Aniversário com Borboletas"

# Adicione o repositório remoto (SUBSTITUA SUA_CONTA)
git remote add origin https://github.com/SUA_CONTA/Convite-de-Aniversario-com-Borboletas.git

# Renomeie a branch para 'main' (se necessário)
git branch -M main

# Faça o push
git push -u origin main
```

## ⏳ Passo 3: Aguarde o Deploy

1. Vá para seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Veja o workflow **"Deploy to GitHub Pages"** rodando
4. Após concluir (✅), vá em **Settings** > **Pages**
5. Verifique se o source está em **"Deploy from a branch"** com `gh-pages`

## 🌐 Passo 4: Acesse seu site!

A URL será:
```
https://SUA_CONTA.github.io/Convite-de-Aniversario-com-Borboletas/
```

Exemplo:
```
https://endrew.github.io/Convite-de-Aniversario-com-Borboletas/
```

## ✨ Funcionalidades que funcionarão:

✅ Animações com Framer Motion  
✅ Contador regressivo  
✅ Formulário de confirmação  
✅ Botão de música com toggle  
✅ Reprodução de áudio (background.mp3)  
✅ Toast notifications  
✅ Borboletas animadas  
✅ Design responsivo  
✅ Backdrop blur & glassmorphism  

## 🆘 Troubleshooting

**"Erro de autenticação no git push?"**
- Use token: [Gerar token](https://github.com/settings/tokens)
- Substitua a senha pelo token

**"Site está em branco?"**
- Limpe o cache (Ctrl+Shift+Delete)
- Aguarde 2-3 minutos para o deploy completo

**"Áudio não toca?"**
- Verifique se `public/audio/background.mp3` foi feito o push
- Abra o DevTools (F12) e veja o Console para erros

**"Página não carrega assets?"**
- Verifique se a base path está correta no vite.config.ts
- Deve estar: `base: '/Convite-de-Aniversario-com-Borboletas/'`

## 📚 Atualizações futuras

Sempre que fizer mudanças localmente, é só fazer:
```powershell
git add .
git commit -m "Descrição da mudança"
git push
```

O GitHub Actions fará o deploy automático! 🚀

---

**Precisa de ajuda?** Abra um issue no repositório ou consulte a [documentação do GitHub Pages](https://docs.github.com/en/pages)
