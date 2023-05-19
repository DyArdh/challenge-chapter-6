const supertest = require("supertest");
const app = require("../app");
const truncate = require("../utils/truncate");
const seeding = require("../utils/seeding");

// Reset Database
truncate.products();
truncate.components();
truncate.componentSupplier();
truncate.productComponents();
truncate.suppliers();

// Run Seeder
seeding.components();
seeding.products();
seeding.productComponents();
seeding.suppliers();
seeding.componentSuppliers();

// Products Controller
describe("Test endpoint /components", () => {
  // Positive Case
  test("Success:[GET] Menampilkan daftar produk", async () => {
    try {
      const res = await supertest(app).get("/components");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("description");
      expect(res.body.data[0]).toHaveProperty("Products");
      expect(res.body.data[0].Products[0]).toHaveProperty("id");
      expect(res.body.data[0].Products[0]).toHaveProperty("name");
      expect(res.body.data[0].Products[0]).toHaveProperty("quantity");
      expect(res.body.data[0].Suppliers[0]).toHaveProperty("id");
      expect(res.body.data[0].Suppliers[0]).toHaveProperty("name");
      expect(res.body.data[0].Suppliers[0]).toHaveProperty("address");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success:[POST] Menambahkan komponen baru", async () => {
    try {
      const res = await supertest(app).post("/components").send({
        name: "KTT Purple Reddish",
        description: "Tactile Clicky",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("description");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  // Negative Case
  test("Failed:[POST] Field descripton kosong", async () => {
    try {
      const res = await supertest(app).post("/components").send({
        name: "KTT Purple Reddish",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Field description is required!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed:[POST] Field name kosong", async () => {
    try {
      const res = await supertest(app).post("/components").send({
        description: "Tactile Clicky",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Field name is required!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

describe("Test endpoint /components/:componentId", () => {
  test("Success: [GET] Menampilkan komponen berdasarkan id", async () => {
    try {
      const componentId = 1;
      const res = await supertest(app).get(`/components/${componentId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("description");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("Products");
      expect(res.body.data.Products[0]).toHaveProperty("id");
      expect(res.body.data.Products[0]).toHaveProperty("name");
      expect(res.body.data.Products[0]).toHaveProperty("quantity");
      expect(res.body.data.Suppliers[0]).toHaveProperty("id");
      expect(res.body.data.Suppliers[0]).toHaveProperty("name");
      expect(res.body.data.Suppliers[0]).toHaveProperty("address");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed:[GET] Komponen tidak ditemukan", async () => {
    try {
      const componentId = 1000;
      const res = await supertest(app).get(`/components/${componentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${componentId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [PUT] Update komponen", async () => {
    try {
      const componentId = 6;
      const res = await supertest(app).put(`/components/${componentId}`).send({
        description: "Tactile Clicky Switch",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(
        `Component with Id ${componentId} Updated!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [PUT] Komponen tidak ditemukan", async () => {
    try {
      const componentId = 1000;
      const res = await supertest(app).put(`/components/${componentId}`).send({
        description: "Tactile Clicky Switch",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${componentId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [DELETE] Menghapus komponen", async () => {
    try {
      const componentId = 5;
      const res = await supertest(app).delete(`/components/${componentId}`);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(
        `Component with Id ${componentId} Deleted!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [DELETE] Komponen sedang digunakan", async () => {
    try {
      const componentId = 1;
      const res = await supertest(app).delete(`/components/${componentId}`);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Component with Id ${componentId} in use!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [DELETE] Komponen tidak ditemukan", async () => {
    try {
      const componentId = 1000;
      const res = await supertest(app).delete(`/components/${componentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${componentId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Product Controller
describe("Test endpoint /products", () => {
  test("Success: [GET] Menampilkan daftar produk", async () => {
    try {
      const res = await supertest(app).get("/products");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("quantity");
      expect(res.body.data[0]).toHaveProperty("Components");
      expect(res.body.data[0].Components[0]).toHaveProperty("id");
      expect(res.body.data[0].Components[0]).toHaveProperty("name");
      expect(res.body.data[0].Components[0]).toHaveProperty("description");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [POST] Menambahkan produk baru", async () => {
    try {
      const res = await supertest(app).post("/products").send({
        name: "TMT V75",
        quantity: 10,
        component_id: 1,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("quantity");
      expect(res.body.data[1]).toHaveProperty("product_id");
      expect(res.body.data[1]).toHaveProperty("component_id");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Field name kosong", async () => {
    try {
      const res = await supertest(app).post("/products").send({
        quantity: 10,
        component_id: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("field name is required");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  test("Failed: [POST] Field quantity kosong", async () => {
    try {
      const res = await supertest(app).post("/products").send({
        name: "TMT V75",
        component_id: 1,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("field quantity is required");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Field component_id kosong", async () => {
    try {
      const res = await supertest(app).post("/products").send({
        name: "TMT V75",
        quantity: 10,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("field component_id is required");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Komponen tidak ditemukan", async () => {
    try {
      const component_id = 1000;
      const res = await supertest(app).post("/products").send({
        name: "TMT V75",
        quantity: 10,
        component_id: component_id,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${component_id} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

describe("Test endpoint /products/:productId", () => {
  test("Success: [GET] Menampilkan product berdasarkan id", async () => {
    try {
      const productId = 1;
      const res = await supertest(app).get(`/products/${productId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("quantity");
      expect(res.body.data).toHaveProperty("Components");
      expect(res.body.data.Components[0]).toHaveProperty("id");
      expect(res.body.data.Components[0]).toHaveProperty("name");
      expect(res.body.data.Components[0]).toHaveProperty("description");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [GET] Produk tidak ditemukan", async () => {
    try {
      const productId = 1000;
      const res = await supertest(app).get(`/products/${productId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Product with Id ${productId} Not Exist!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [PUT] Update Produk", async () => {
    try {
      const productId = 6;
      const res = await supertest(app).put(`/products/${productId}`).send({
        name: "TMT V75 V2",
        component_id: 2,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(`Product with Id ${productId} Updated!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [PUT] Produk tidak ditemukan", async () => {
    try {
      const productId = 1000;
      const res = await supertest(app).put(`/products/${productId}`).send({
        name: "TMT V75 V2",
        component_id: 2,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Product with Id ${productId} Not Exist!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [PUT] Komponen tidak ditemukan", async () => {
    try {
      const productId = 1000;
      const component_id = 1000;
      const res = await supertest(app).put(`/products/${productId}`).send({
        name: "TMT V75 V2",
        component_id: component_id,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Product with Id ${productId} Not Exist!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [DELETE] Menghapus Produk", async () => {
    try {
      const productId = 6;
      const res = await supertest(app).delete(`/products/${productId}`);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(`Product with Id ${productId} Deleted!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [DELETE] Produk tidak ditemukan", async () => {
    try {
      const productId = 1000;
      const res = await supertest(app).delete(`/products/${productId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Product with Id ${productId} Not Exist!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Supplier Controller
describe("Test endpoint /suppliers", () => {
  test("Success: [GET] Menampilkan daftar supplier", async () => {
    try {
      const res = await supertest(app).get("/suppliers");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("address");
      expect(res.body.data[0]).toHaveProperty("Components");
      if (res.body.data[0].Components != []) {
        expect(res.body.data[0].Components[0]).toHaveProperty("id");
        expect(res.body.data[0].Components[0]).toHaveProperty("name");
        expect(res.body.data[0].Components[0]).toHaveProperty("description");
      }
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  const supplier = {
    name: "KTT",
    address: "China",
    component_id: 1,
  };

  test("Success: [POST] Menambahkan Supplier Baru", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send({
        name: supplier.name,
        address: supplier.address,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("address");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [POST] Menambahkan Supplier Baru dengan komponen", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send({
        name: supplier.name,
        address: supplier.address,
        component_id: supplier.component_id,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("address");
      expect(res.body.data[1]).toHaveProperty("supplier_id");
      expect(res.body.data[1]).toHaveProperty("component_id");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Field name kosong", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send({
        address: supplier.address,
        component_id: supplier.component_id,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Field name is required!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Field address kosong", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send({
        name: supplier.name,
        component_id: supplier.component_id,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Field address is required!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [POST] Field name kosong", async () => {
    try {
      const component_id = 1000;
      const res = await supertest(app).post("/suppliers").send({
        name: supplier.name,
        address: supplier.address,
        component_id: component_id,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${component_id} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

describe("Test endpoint /suppliers/:supplierId", () => {
  test("Success: [GET] Menampilkan supplier berdasarkan id", async () => {
    try {
      const supplierId = 1;
      const res = await supertest(app).get(`/suppliers/${supplierId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("address");
      expect(res.body.data).toHaveProperty("Components");
      if (res.body.data.Components != []) {
        expect(res.body.data.Components[0]).toHaveProperty("id");
        expect(res.body.data.Components[0]).toHaveProperty("name");
        expect(res.body.data.Components[0]).toHaveProperty("description");
      }
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [GET] Menampilkan supplier berdasarkan id", async () => {
    try {
      const supplierId = 1000;
      const res = await supertest(app).get(`/suppliers/${supplierId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Supplier with Id ${supplierId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [PUT] Update supplier", async () => {
    try {
      const supplierId = 6;
      const res = await supertest(app).put(`/suppliers/${supplierId}`).send({
        address: "Tiongkok",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(`Supplier with Id ${supplierId} Updated!`);
    } catch (error) {}
  });

  test("Failed: [PUT] Supplier tidak ditemukan", async () => {
    try {
      const supplierId = 1000;
      const res = await supertest(app).put(`/suppliers/${supplierId}`).send({
        address: "Tiongkok",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Supplier with Id ${supplierId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [PUT] Komponen tidak ditemukan", async () => {
    try {
      const supplierId = 6;
      const component_id = 1000;
      const res = await supertest(app).put(`/suppliers/${supplierId}`).send({
        address: "Tiongkok",
        component_id: component_id,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Component with Id ${component_id} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Success: [DELETE] Menghapus supplier", async () => {
    try {
      const supplierId = 5;
      const res = await supertest(app).delete(`/suppliers/${supplierId}`);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(`Supplier with Id ${supplierId} Deleted!`);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("Failed: [DELETE] Supplier tidak ditemukan", async () => {
    try {
      const supplierId = 1000;
      const res = await supertest(app).delete(`/suppliers/${supplierId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Supplier with Id ${supplierId} Not Exist!`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
