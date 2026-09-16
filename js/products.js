/* Dados opcionais por produto: price (número ou texto), sizes (lista ou texto),
   availability (texto ou booleano) e gallery (lista de caminhos WebP com variantes -480/-800).
   Não preencher preços, tamanhos ou estoque sem confirmação da loja. */
const PRODUCTS = [
  {id:1,name:"Conjunto preto de cerejas",category:"meninas",image:"assets/products/conjunto-preto-cerejas.webp",description:"Um conjunto com estampa de cerejas para looks cheios de personalidade.",available:null,new:true},
  {id:2,name:"Conjunto roxo de corações",category:"meninas",image:"assets/products/conjunto-roxo-coracoes.webp",description:"Corações delicados em um look com personalidade.",available:null,new:true},
  {id:3,name:"Conjunto rosa com cerejas",category:"meninas",image:"assets/products/conjunto-rosa-cerejas.webp",description:"Cerejas e tons de rosa em uma combinação divertida.",available:null},
  {id:4,name:"Conjunto azul",category:"meninos",image:"assets/products/conjunto-azul.webp",description:"Um look azul versátil para acompanhar as brincadeiras.",available:null,new:true},
  {id:5,name:"Camiseta verde e short preto",category:"meninos",image:"assets/products/camiseta-verde-short-preto.webp",description:"Uma combinação leve, confortável e cheia de estilo.",available:null,new:true},
  {id:6,name:"Polo azul e short claro",category:"meninos",image:"assets/products/polo-azul-short-claro.webp",description:"Visual casual para ocasiões especiais e dias comuns.",available:null},
  {id:7,name:"Look amarelo editorial",category:"meninos",image:"assets/editorial/look-amarelo-campanha.webp",description:"Uma inspiração em amarelo suave para brincar com estilo.",available:null},
  {id:8,name:"Romper azul estampado",category:"bebes",image:"assets/products/romper-azul-estampado.webp",description:"Uma peça colorida e leve para os primeiros dias de brincadeira.",available:null}
];
