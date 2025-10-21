const request = require('supertest');
const app = require('../../src/app');

describe('Aplicación Express', () => {
  it('debe iniciar correctamente', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bienvenido');
  });

  it('debe manejar rutas no existentes', async () => {
    const response = await request(app).get('/ruta-inexistente');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Ruta no encontrada');
  });
});
