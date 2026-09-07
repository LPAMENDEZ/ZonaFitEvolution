class ErrorDominio extends Error {
  constructor(mensaje, codigoEstado = 400) {
    super(mensaje);
    this.name = 'ErrorDominio';
    this.codigoEstado = codigoEstado;
  }
}

module.exports = ErrorDominio;
