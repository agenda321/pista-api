const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- REPOSITÓRIO COMPLETO DE PISTAS (Sua base de dados oficial) ---
const pistas = [
  {pista:"Alto Mucajai",cod:"SJYG",seco:300,molhado:200,tipo:"C206"},
  {pista:"Araca",cod:"ZZZZ",seco:300,molhado:200,tipo:"C206"},
  {pista:"Auaris",cod:"SWVB",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Baixo Catrimani",cod:"SJYK",seco:300,molhado:200,tipo:"C206"},
  {pista:"Baixo Mucajai",cod:"SJYL",seco:350,molhado:400,tipo:"Todas"},
  {pista:"Balawau",cod:"ZZZZ",seco:350,molhado:300,tipo:"C210"},
  {pista:"Barcelos",cod:"SWBC",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Budu",cod:"ZZZZ",seco:300,molhado:250,tipo:"C206"},
  {pista:"Catrimani I",cod:"SJKS",seco:300,molhado:250,tipo:"C206"},
  {pista:"Demini",cod:"ZZZZ",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Erico",cod:"SWAQ",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Halikato U",cod:"SJLE",seco:300,molhado:250,tipo:"C206"},
  {pista:"Maloca Paapiu",cod:"SWMV",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Marari",cod:"ZZZZ",seco:350,molhado:300,tipo:"C210"},
  {pista:"Maturaca",cod:"SWMK",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Maxapapi",cod:"ZZZZ",seco:250,molhado:200,tipo:"C206"},
  {pista:"Missao Catrimani",cod:"SJLU",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Missao Maruia",cod:"ZZZZ",seco:350,molhado:300,tipo:"C210"},
  {pista:"Novo Demini",cod:"ZZZZ",seco:300,molhado:200,tipo:"C210"},
  {pista:"Olomai",cod:"SDRM",seco:250,molhado:150,tipo:"C206"},
  {pista:"Onkiola",cod:"SDRP",seco:200,molhado:150,tipo:"C206"},
  {pista:"Palimiu",cod:"SJMH",seco:400,molhado:250,tipo:"Todas"},
  {pista:"Parafuri",cod:"SJMI",seco:300,molhado:200,tipo:"C206"},
  {pista:"Sta Isabel Rio Negro",cod:"SWTP",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Sao Gab Cachoeira",cod:"SBUA",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Sauba",cod:"SDWO",seco:250,molhado:200,tipo:"C206"},
  {pista:"Surucucu",cod:"SWUQ",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Toototobi",cod:"ZZZZ",seco:300,molhado:250,tipo:"C210"},
  {pista:"Tucuxim",cod:"SDYT",seco:300,molhado:250,tipo:"C206"},
  {pista:"Uraricoera",cod:"SJNC",seco:300,molhado:250,tipo:"C206"},
  {pista:"Uxiu",cod:"SDZC",seco:250,molhado:200,tipo:"C206"},
  {pista:"Waicas",cod:"SWAE",seco:400,molhado:250,tipo:"Todas"},
  {pista:"Xiroxirobiu",cod:"ZZZZ",seco:200,molhado:100,tipo:"C206"},
  {pista:"Xitei",cod:"SJNG",seco:350,molhado:200,tipo:"C206"},
  {pista:"Xihopi",cod:"ZZZZ",seco:350,molhado:250,tipo:"C210"},
  {pista:"Pewau",cod:"ZZZZ",seco:200,molhado:150,tipo:"C206"},
  {pista:"Waharo",cod:"ZZZZ",seco:330,molhado:280,tipo:"C210"},
  {pista:"Hemarepiwei",cod:"ZZZZ",seco:300,molhado:250,tipo:"C206"},
  {pista:"Ajuricaba",cod:"ZZZZ",seco:300,molhado:250,tipo:"C206"},
  {pista:"Koherebi",cod:"ZZZZ",seco:300,molhado:200,tipo:"C206"},
  {pista:"Xamani",cod:"ZZZZ",seco:250,molhado:200,tipo:"C206"},
  {pista:"Serra Estrutura",cod:"ZZZZ",seco:300,molhado:250,tipo:"C210"},
  {pista:"Hokolassimu",cod:"ZZZZ",seco:250,molhado:200,tipo:"C206"},
  {pista:"Agua Fria Normandia",cod:"-",seco:300,molhado:200,tipo:"C206"},
  {pista:"Andorinha",cod:"-",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Angical",cod:"SDKA",seco:350,molhado:200,tipo:"C206"},
  {pista:"Bananal",cod:"SJYO",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Barreirinha",cod:"SJYQ",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Campo Formoso",cod:"SJYT",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Contao",cod:"SJKT",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Surumu",cod:"SWMU",seco:400,molhado:400,tipo:"Todas"}
];

const c210Liberado = ["DPD","GPG","LSO","NYA"];

// --- CONFIGURAÇÃO DO TWILIO (Lendo da Render) ---
const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
);

// --- ROTA DE ENVIO DE VOO ---
app.post('/api/voos', async (req, res) => {
    const { prefixo, destino, carga, cmte, hora } = req.body;

    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            body: `*LIBERADO POR: EDENILSON*\n*Prefixo:* ${prefixo}\n*Destino:* ${destino}\n*Cmte:* ${cmte}\n*Peso:* ${carga}kg\n*Hora:* ${hora}`,
            to: 'whatsapp:+5595991537045'
        });

        console.log(`Voo enviado para Edenilson: ${prefixo}`);
        res.status(200).json({ status: "Sucesso", message: "WhatsApp enviado!" });
    } catch (error) {
        console.error("Erro no Twilio:", error);
        res.status(500).json({ status: "Erro", message: error.message });
    }
});

// --- ROTAS DE CONSULTA ---
app.get('/pistas', (req, res) => res.json(pistas));

app.get('/pistas/:cod', (req, res) => {
  const pista = pistas.find(p => p.cod.toUpperCase() === req.params.cod.toUpperCase());
  pista ? res.json(pista) : res.status(404).json({ erro: "Pista não encontrada" });
});

app.listen(port, () => console.log(`Servidor Voare Completo na porta ${port}`));
