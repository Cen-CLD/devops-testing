const request = require('supertest');
const app = require('../../src/app');

describe('Rutas de la API', () => {
  describe('GET /health', () => {
    it('debe retornar el estado del servidor', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
    });
  });

  describe('POST /calculate', () => {
    it('debe realizar suma correctamente', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 5, b: 3 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
      expect(response.body.operation).toBe('add');
    });

    it('debe realizar resta correctamente', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'subtract', a: 10, b: 4 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6);
    });

    it('debe manejar división por cero', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 10, b: 0 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('No se puede dividir por cero');
    });

    it('debe validar parámetros requeridos', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add' });

      expect(response.status).toBe(400);
    });

    it('debe devolver error si la operación no es válida', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'potencia', a: 2, b: 3 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Operación no válida');
    });
  });
});
