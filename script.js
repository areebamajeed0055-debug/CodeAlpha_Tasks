const items = [...document.querySelectorAll('.item')];
const buttons = document.querySelectorAll('.btn');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let gallery = items, index = 0;

buttons.forEach(btn =>
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    items.forEach(i =>
      i.style.display = f === 'all' || i.dataset.category === f ? '' : 'none'
    );

    gallery = items.filter(i => i.style.display !== 'none');
  }
);

const open = i => {
  index = gallery.indexOf(i);
  lightbox.classList.add('active');
  lightboxImg.src = i.querySelector('img').src;
  document.body.style.overflow = 'hidden';
};

const close = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
};

const change = step => {
  index = (index + step + gallery.length) % gallery.length;
  lightboxImg.src = gallery[index].querySelector('img').src;
};

items.forEach(i => i.onclick = () => open(i));

document.querySelector('.next-arrow').onclick = () => change(1);
document.querySelector('.prev-arrow').onclick = () => change(-1);
document.querySelector('.close-btn').onclick = close;

lightbox.onclick = e => e.target === lightbox && close();
