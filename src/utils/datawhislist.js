import produkImg from "../assets/image/imgProduk.svg";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 6,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const datawhislist = [
  {
    id: 1,
    image: produkImg,
    name: "Jual Kue Rambut Per pcs",
    price: 15000,
    rating: 4.6,
    ulasan: "(999 Ulasan)",
  },
  {
    id: 2,
    image: produkImg,
    name: "Keripik Pisang Selera,Manis 0,5 kg - 1 kg",
    price: 60000,
    rating: 4.6,
    ulasan: "(999 Ulasan)",
  },
  {
    id: 3,
    image: produkImg,
    name: "Keripik singkong pedas manis lengket 100 gram - 100 gram",
    price: 15000,
    rating: 4.6,
    ulasan: "(999 Ulasan)",
  },
];