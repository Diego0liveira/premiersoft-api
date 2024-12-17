/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',  //Permite rodar testes escritos em TypeScript.
  testEnvironment: 'node', //Define o ambiente Node.js para os testes.
  collectCoverage: true, //Habilita a coleta de cobertura de código.
  coverageDirectory: 'coverage', //Define o diretório onde os relatórios de cobertura serão salvos.
  coverageReporters: ['text', 'lcov'], //Gera relatórios no formato lcov (necessário para Codecov) e texto.
  moduleFileExtensions: ['ts', 'js', 'json'], //Define as extensões de arquivo que o Jest deve considerar.
  testMatch: ['**/__tests__/**/*.spec.ts'], //Localização dos arquivos de teste (por padrão *.spec.ts).
};
