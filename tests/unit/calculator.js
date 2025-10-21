const { add, subtract, multiply, divide } = require('../../src/utils/calculator');

describe('Calculator', () => {
  describe('add', () => {
    it('debe sumar dos números positivos correctamente', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('debe sumar números negativos correctamente', () => {
      expect(add(-1, -1)).toBe(-2);
    });

    it('debe sumar cero correctamente', () => {
      expect(add(5, 0)).toBe(5);
    });

    it('debe concatenar strings si se pasan como argumentos', () => {
      expect(add('2', '3')).toBe('23'); 
    });
  });

  describe('subtract', () => {
    it('debe restar dos números correctamente', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('debe manejar resultados negativos', () => {
      expect(subtract(3, 5)).toBe(-2);
    });

    it('debe devolver NaN si los argumentos no son números', () => {
      expect(subtract('a', 2)).toBeNaN();
    });
  });

  describe('multiply', () => {
    it('debe multiplicar dos números correctamente', () => {
      expect(multiply(4, 3)).toBe(12);
    });

    it('debe multiplicar por cero correctamente', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('debe manejar números negativos correctamente', () => {
      expect(multiply(-4, 3)).toBe(-12);
    });
  
    it('debe devolver NaN si los argumentos no son números', () => {
      expect(multiply('x', 3)).toBeNaN();
    });
  });

  describe('divide', () => {
    it('debe dividir dos números correctamente', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('debe lanzar error al dividir por cero', () => {
      expect(() => divide(10, 0)).toThrow('No se puede dividir por cero');
    });

    it('debe manejar decimales correctamente', () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    it('debe manejar divisiones negativas correctamente', () => {
      expect(divide(-10, 2)).toBe(-5);
    });
  
    it('debe devolver NaN si los argumentos no son números', () => {
      expect(divide('a', 2)).toBeNaN();
    });
  });
});
