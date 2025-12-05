const multer = require('multer');
const path = require('path');

// Configuração de Armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // A pasta onde vai salvar (certifique-se que ela existe na raiz)
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Cria um nome único: data-atual + extensão original (ex: 123456789.jpg)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro (Aceitar apenas imagens)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato de arquivo inválido. Apenas imagens são permitidas.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB
});

module.exports = upload;