const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
  {pista:"Agua Fria Cotingo",cod:"SJ??",seco:350,molhado:300,tipo:"C206"},
  {pista:"Andorinha",cod:"-",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Angical",cod:"SDKA",seco:350,molhado:200,tipo:"C206"},
  {pista:"Arai",cod:"SJYI",seco:null,molhado:null,tipo:"C206"},
  {pista:"Area Unica",cod:"ZZZZ",seco:350,molhado:250,tipo:"C206"},
  {pista:"Bala",cod:"SJYM",seco:400,molhado:300,tipo:"C206"},
  {pista:"Bananal",cod:"SJYO",seco:400,molhado:300,tipo:"C206/210"},
  {pista:"Bananeira",cod:"SJYP",seco:300,molhado:200,tipo:"C206"},
  {pista:"Barreirinha",cod:"SJYQ",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Caju",cod:"SJYR",seco:350,molhado:150,tipo:"C206"},
  {pista:"Camara",cod:"SJYS",seco:300,molhado:200,tipo:"C206"},
  {pista:"Campo Formoso",cod:"SJYT",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Campo Grande",cod:"SJYU",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Cana",cod:"SJKL",seco:400,molhado:300,tipo:"C206"},
  {pista:"Canawapai",cod:"SJKM",seco:350,molhado:200,tipo:"C206"},
  {pista:"Caracana",cod:"SJKN",seco:350,molhado:250,tipo:"C206"},
  {pista:"Caracarana",cod:"SDKL",seco:400,molhado:350,tipo:"C206/210"},
  {pista:"Caramamba",cod:"SJKQ",seco:300,molhado:200,tipo:"Todas"},
  {pista:"Caraparu",cod:"SJKP",seco:400,molhado:350,tipo:"Todas"},
  {pista:"Cararau",cod:"SJKO",seco:350,molhado:300,tipo:"C206"},
  {pista:"Contao",cod:"SJKT",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Cumaipa",cod:"SJKU",seco:400,molhado:300,tipo:"C206"},
  {pista:"Cumana 1",cod:"SJKV",seco:400,molhado:350,tipo:"C206"},
  {pista:"Cumana 2",cod:"SJKW",seco:400,molhado:300,tipo:"C206"},
  {pista:"Cutia",cod:"SJKX",seco:400,molhado:300,tipo:"C206"},
  {pista:"Estevao",cod:"SJKZ",seco:300,molhado:200,tipo:"C206"},
  {pista:"Feliz Encontro",cod:"ZZZZ",seco:400,molhado:300,tipo:"C206"},
  {pista:"Flechal",cod:"SJLA",seco:250,molhado:200,tipo:"C206"},
  {pista:"Jacamim",cod:"SJLH",seco:400,molhado:200,tipo:"C206"},
  {pista:"Jatapuzinho",cod:"SJLI",seco:400,molhado:300,tipo:"C206"},
  {pista:"Lago Verde",cod:"SDMM",seco:200,molhado:150,tipo:"C206"},
  {pista:"Makukem",cod:"SDPI",seco:250,molhado:200,tipo:"C206"},
  {pista:"Maloquinha",cod:"SJLN",seco:350,molhado:250,tipo:"C206"},
  {pista:"Manalai",cod:"SJLO",seco:300,molhado:180,tipo:"C206"},
  {pista:"Manoa Pium",cod:"SJLP",seco:300,molhado:180,tipo:"C206"},
  {pista:"Maracana",cod:"SJLQ",seco:350,molhado:300,tipo:"C206"},
  {pista:"Marupa",cod:"SJLS",seco:300,molhado:200,tipo:"C206"},
  {pista:"Mato Grosso",cod:"SJME",seco:350,molhado:250,tipo:"C206"},
  {pista:"Maturuca",cod:"SJLL",seco:300,molhado:250,tipo:"Todas"},
  {pista:"Morro",cod:"SJLV",seco:280,molhado:200,tipo:"C206/210"},
  {pista:"Mudubim 1",cod:"SJLW",seco:210,molhado:null,tipo:"C206"},
  {pista:"Mutum",cod:"SJLX",seco:300,molhado:250,tipo:"C206/210"},
  {pista:"Nova Alianca 1",cod:"-",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Nova Vitoria",cod:"SDPX",seco:250,molhado:150,tipo:"C206"},
  {pista:"Orixique",cod:"SYC?",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Pacu",cod:"SJMF",seco:200,molhado:150,tipo:"C206"},
  {pista:"Parana",cod:"-",seco:300,molhado:100,tipo:"C206"},
  {pista:"Pedra Branca",cod:"SJMJ",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Pedra Preta",cod:"SJMK",seco:350,molhado:150,tipo:"C206"},
  {pista:"Piolho",cod:"SJML",seco:350,molhado:250,tipo:"C206"},
  {pista:"Pipi",cod:"SJMM",seco:400,molhado:300,tipo:"C210"},
  {pista:"Ponto Geral",cod:"SDRT",seco:400,molhado:250,tipo:"C206"},
  {pista:"Raposa",cod:"SJMN",seco:400,molhado:300,tipo:"Todas"},
  {pista:"Sama I",cod:"SDSD",seco:300,molhado:250,tipo:"C206"},
  {pista:"Santa Creuza",cod:"-",seco:300,molhado:200,tipo:"C206"},
  {pista:"Santa Isabel",cod:"SJMO",seco:300,molhado:200,tipo:"C206"},
  {pista:"Santa Liberdade",cod:"SJMP",seco:300,molhado:250,tipo:"Todas"},
  {pista:"Sta M Normandia",cod:"SJMQ",seco:250,molhado:200,tipo:"C206"},
  {pista:"Santa Rosa",cod:"SDUG",seco:350,molhado:300,tipo:"C206"},
  {pista:"Santo Antonio Pao",cod:"SDVF",seco:300,molhado:200,tipo:"C206"},
  {pista:"Sao Luiz Cotingo",cod:"SDVP",seco:400,molhado:300,tipo:"C206"},
  {pista:"Sapan",cod:"SDWF",seco:250,molhado:180,tipo:"C206"},
  {pista:"Sauparu",cod:"SJMU",seco:350,molhado:150,tipo:"Todas"},
  {pista:"Serra do Sol",cod:"SJMV",seco:350,molhado:250,tipo:"Todas"},
  {pista:"Surumu",cod:"SWMU",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Terra Preta",cod:"ZZZZ",seco:null,molhado:null,tipo:"C210"},
  {pista:"Travessao",cod:"ZZZZ",seco:200,molhado:150,tipo:"C206"},
  {pista:"Ubaru",cod:"SJNB",seco:400,molhado:300,tipo:"C206"},
  {pista:"Uiramuta",cod:"-",seco:400,molhado:400,tipo:"Todas"},
  {pista:"Vizela",cod:"ZZZZ",seco:300,molhado:150,tipo:"C206"},
  {pista:"Wapum",cod:"SJNE",seco:250,molhado:250,tipo:"C206"},
  {pista:"Warogarem",cod:"SDZN",seco:300,molhado:200,tipo:"C206"},
  {pista:"Waromada",cod:"SDZO",seco:300,molhado:200,tipo:"C206"}
];

const c210Liberado = ["DPD","GPG","LSO","NYA"];

app.get('/pistas', (req, res) => res.json(pistas));

app.get('/pistas/:cod', (req, res) => {
  const pista = pistas.find(p => p.cod.toUpperCase() === req.params.cod.toUpperCase());
  pista ? res.json(pista) : res.status(404).json({ erro: "Pista não encontrada" });
});

app.get('/verificar-c210/:cod', (req, res) => {
  const liberado = c210Liberado.includes(req.params.cod.toUpperCase());
  res.json({ cod: req.params.cod.toUpperCase(), c210Liberado: liberado });
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
