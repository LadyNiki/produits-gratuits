const products=[{name:'Échantillon gratuit',price:'Gratuit',image:'https://via.placeholder.com/300x200?text=Produit+1',link:'#'},{name:'Produit promotionnel',price:'Gratuit',image:'https://via.placeholder.com/300x200?text=Produit+2',link:'#'},{name:'Offre spéciale',price:'Gratuit',image:'https://via.placeholder.com/300x200?text=Produit+3',link:'#'}];
const d=document.getElementById('products'),s=document.getElementById('search');
function show(list){d.innerHTML='';list.forEach(p=>d.innerHTML+=`<div class="card"><img src="${p.image}" alt=""><h3>${p.name}</h3><p>${p.price}</p><a href="${p.link}" target="_blank">Voir l'offre</a></div>`)}
s.addEventListener('input',()=>show(products.filter(p=>p.name.toLowerCase().includes(s.value.toLowerCase()))));
show(products);