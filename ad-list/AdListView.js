
export function buildAdView(ad) {
  const AdView = buildAdListingView(ad);
  let AdTemplate = `
    <a href="/singleAd.html?id=${ad.id}">
      ${AdView}
    </a>
  `;

  return AdTemplate;
}


export function buildAdListingView(ad) {
  let  adTemplate = `
    <p class="tipo"><span class="${ad.type}">${ad.type}</span></p>
    <img src="${ad.image}">
      <p class="precio">${ad.price}€</p>
      <p class="nombre">${ad.title}</p>
      <p class="descripcion">${ad.extract}</p>`;
  return adTemplate;
}



export function buildAdListSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}


export function buildNotFoundAdsView() {
  return `
    <h1>Lo sentimos, no hay ningun anuncio que mostrar.</h1>
  `;
}