export function buildAdSingleView(ad) {
    let adTemplate = `
    <img src="${ad.image}">
    <h1 class="nombre">${ad.title}</h1>
        <p class="precio">${ad.price}€</p>
        <p class="tipo"><span class="${ad.type}">${ad.type}</span></p>
  
        <p class="descripcion">${ad.extract}</p>
        `;
  
    return adTemplate;
  }
  
  
  