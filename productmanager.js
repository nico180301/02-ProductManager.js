import fs from "fs";

import { title } from "process";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productos = JSON.parse(
          await fs.promises.readFile(this.path, "utf-8")
        );

        return productos;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct() {
    if (
      !producto.title ||
      !producto.description ||
      !producto.price ||
      !producto.thumbnail ||
      !producto.code ||
      !producto.stock
    ) {
      return "All fields are required";
    }

    const productos = await this.getProducts();

    let existe = productos.find((p) => p.code == producto.code);

    if (existe) {
      return "The Product Code Already Exist.";
    } else {
      if (productos.length === 0) {
        producto.id = 1;
      } else {
        producto.id = productos[productos.length - 1].id + 1;
      }

      productos.push(producto);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, "\t")
      );

      return productos;
    }
  }

  async getProductById() {
    const productos = await this.getProducts();

    let producto = productos.find((producto) => producto.id == productId);

    if (producto) {
      return producto;
    } else {
      return "Not Found";
    }
  }

  async updateProduct() {
    try {
      const productos = await this.getProducts();

      const productoIndex = productos.findIndex((prod) => prod.id === id);

      if (productoIndex != -1) {
        if (updateProduct.title) {
          productos[productoIndex].title = updateProduct.title;
        }

        if (updateProduct.description) {
          productos[productoIndex].description = updateProduct.description;
        }

        if (updateProduct.price) {
          productos[productoIndex].price = updateProduct.price;
        }

        if (updateProduct.thumbnail) {
          productos[productoIndex].thumbnail = updateProduct.thumbnail;
        }

        if (updateProduct.code) {
          productos[productoIndex].code = updateProduct.code;
        }

        if (updateProduct.stock) {
          productos[productoIndex].stock = updateProduct.stock;
        }

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, "\t")
        );

        return "Product Updated Successfully.";
      } else {
        return "Prodcut not found";
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(productId) {
    try {
      const productos = await this.getProducts();

      const productoIndex = productos.findIndex((p) => p.id == productId);

      if (productoIndex != -1) {
        productos.splice(productoIndex, 1);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, "\t")
        );

        return "Product Delete Successfully.";
      } else {
        return "Prodcut not found";
      }
    } catch (error) {
      return error;
    }
  }
}
