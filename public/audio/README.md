# 🎵 Pasta de Áudio

## ⚠️ IMPORTANTE: Mover arquivo de áudio aqui

O arquivo `background.mp3` está atualmente em `src/assets/audio/` mas precisa estar aqui em `public/audio/` para funcionar.

### Passo 1: Mova o arquivo
```
De: src/assets/audio/background.mp3
Para: public/audio/background.mp3
```

### Como mover:
1. Abra o Explorer/Finder
2. Navegue até `src/assets/audio/`
3. Copie o arquivo `background.mp3`
4. Cole aqui em `public/audio/`
5. Atualize o navegador (F5)

### Ou pelo Terminal:
```bash
# Windows (PowerShell)
move "src\assets\audio\background.mp3" "public\audio\background.mp3"

# Mac/Linux
mv src/assets/audio/background.mp3 public/audio/background.mp3
```

## ✅ Após mover:
- O botão não deve estar mais desativado
- A música deve tocar ao carregar a página
- Clique no ícone 🔊 para controlar o áudio

## 📝 Especificações:
- **Nome exato**: `background.mp3`
- **Formato**: MP3
- **Volume**: 30% (pode aumentar no código)
- **Loop**: Sim (toca em repetição)

Se não funcionar, abra o Console (F12 > Console) e procure por mensagens de erro. 🐛
