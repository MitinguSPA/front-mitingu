import { Product } from "../types";

import Ramen1 from "../images/logo/ramen (1).jpg";
import Ramen2 from "../images/logo/ramen (2).jpg";
import Ramen3 from "../images/logo/ramen (3).jpg";
import Ramen4 from "../images/logo/ramen (4).jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Ramen Box - Buldak Challenge Ramen Coreano",
    price: 29990,
    description:
      "Incluye 6 ramen coreanos picantes de distintos sabores de la marca Samyang Buldak. La caja incluye 6 ramen coreanos picantes de diferentes sabores. Todos sabores de ramen Samyang pueden ir variando de acuerdo al stock disponible. La segunda foto es de referencia de los sabores que te pueden tocar. Todos sabores de ramen Samyang pueden ir variando de acuerdo al stock disponible.",
    shortDescription: "Ramen Box - Caja de ramen coreano instantáneo.",
    imageUrl: Ramen1,
    category: "snacks",
  },
  {
    id: 2,
    name: "LAYS Brand - Papas fritas crujientes sabor picante",
    price: 3990,
    description:
      "Las papas fritas crujientes combinan con la receta original sabor picante de ramen coreano. Lays está hecho de grandes patatas auténticas que han sido cuidadosamente seleccionadas.",
    shortDescription: "Papas fritas Lays sabor ramen picante.",
    imageUrl: Ramen2,
    category: "snacks",
  },
  {
    id: 3,
    name: "Ramen En Pote Buldak Coreano Variedad Carbonara, Queso, Rose",
    price: 3990,
    description:
      "Descubre el delicioso Ramen En Pote Buldak Coreano en su irresistible variedad Carbonara y Queso. Este ramen SIN CALDO es la opción perfecta para quienes buscan una comida rápida y sabrosa, ideal para cualquier momento del día. Su preparación es sumamente sencilla: solo necesitas agregar agua caliente y en tan solo 4 a 5 minutos podrás disfrutar de una experiencia culinaria única. Este producto es halal, lo que lo convierte en una opción accesible para todos. Con un peso neto de 120 g, es ideal para una comida individual o un snack sustancioso. La marca Buldak es reconocida por su calidad y auténtico sabor coreano, garantizando que cada bocado sea una explosión de sabor.",
    shortDescription: "Ramen Buldak en pote - variedades sin caldo",
    imageUrl: Ramen3,
    category: "snacks",
  },
  {
    id: 4,
    name: "Topokki Tradicional Coreano 240g",
    price: 4990,
    description:
      "Topokki tradicional coreano de 240g. Comida instantánea lista para disfrutar. Ideal para dos personas.",
    shortDescription: "Topokki coreano para 2 personas, 240g",
    imageUrl: Ramen4,
    category: "snacks",
  },
];
