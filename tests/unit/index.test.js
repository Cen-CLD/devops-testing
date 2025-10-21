const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/index');

describe('Rutas principales', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', router);
  });

  describe('GET /', () => {
    it('debe devolver información general de la API', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(Array.isArray(response.body.endpoints)).toBe(true);
      expect(response.body.message).toContain('Bienvenido');
    });
  });

  describe('POST /calculate', () => {
    it('debe sumar correctamente dos números', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 2, b: 3 });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(5);
      expect(response.body.operation).toBe('add');
      expect(typeof response.body.timestamp).toBe('string');
    });

    it('debe restar correctamente dos números', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'subtract', a: 5, b: 2 });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(3);
    });

    it('debe multiplicar correctamente dos números', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'multiply', a: 4, b: 2 });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
    });

    it('debe dividir correctamente dos números', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 10, b: 2 });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(5);
    });

    it('debe manejar error de división por cero', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 10, b: 0 });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('No se puede dividir por cero');
    });

    it('debe devolver error si "a" o "b" no son números', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 'dos', b: 3 });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('deben ser números');
    });

    it('debe devolver error si la operación no es válida', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'potencia', a: 2, b: 3 });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Operación no válida');
      expect(response.body.validOperations).toEqual(
        expect.arrayContaining(['add', 'subtract', 'multiply', 'divide'])
      );
    });
  });
});
