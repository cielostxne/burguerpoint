import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

const productos = [
  {
    nombre: "Classic Burger",
    descripcion: "Hamburguesa con carne de res, lechuga, tomate, queso cheddar y salsa especial",
    precio: 12.99,
    categoria: "hamburguesas",
    imagen: "/imagenes/classic.jpg",
    disponible: true
  },
  {
    nombre: "Bacon BBQ",
    descripcion: "Hamburguesa con tocino, cebolla caramelizada, queso y salsa BBQ casera",
    precio: 14.99,
    categoria: "hamburguesas",
    imagen: "/imagenes/bbq.jpg",
    disponible: true
  },
  {
    nombre: "Mexican Burger",
    descripcion: "Hamburguesa con guacamole, jalapeños, queso pepper jack y pico de gallo",
    precio: 13.99,
    categoria: "hamburguesas",
    imagen: "/imagenes/mexican.jpg",
    disponible: true
  },
  {
    nombre: "Papas Fritas",
    descripcion: "Papas fritas crujientes con sal marina",
    precio: 4.99,
    categoria: "complementos",
    imagen: "/imagenes/fries.jpg",
    disponible: true
  },
  {
    nombre: "Aros de Cebolla",
    descripcion: "Aros de cebolla empanizados y crujientes",
    precio: 5.99,
    categoria: "complementos",
    imagen: "/imagenes/onion-rings.jpg",
    disponible: true
  }
];
const usuarios = [
  {
    nombre: "Administrador",
    email: "admin@burgerpoint.com",
    rol: "admin",
    fechaRegistro: new Date()
  },
  {
    nombre: "Cliente Demo",
    email: "cliente@ejemplo.com",
    rol: "cliente",
    fechaRegistro: new Date()
  }
];

export const poblarUsuarios = async () => {
  try {
    for (const usuario of usuarios) {
      await addDoc(collection(db, 'usuarios'), usuario);
    }
    console.log('✅ Usuarios agregados exitosamente');
  } catch (error) {
    console.error('❌ Error al agregar usuarios:', error);
  }
};

export const poblarBaseDatos = async () => {
  try {
    for (const producto of productos) {
      await addDoc(collection(db, 'productos'), {
        ...producto,
        fechaCreacion: new Date()
      });
    }
    console.log('✅ Base de datos poblada exitosamente');
  } catch (error) {
    console.error('❌ Error al poblar la base:', error);
  }
};
