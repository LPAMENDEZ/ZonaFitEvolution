const membresiaRepository = require('./src/repositories/membresia.repository');

async function probar() {
  try {
    const nuevoId = await membresiaRepository.crear({
      tipo: 'mensual',
      precio: 50000,
      fecha_inicio: '2026-09-07',
      fecha_fin: '2026-10-07',
      usuario_id: 5
    });
    console.log('Membresía creada con id:', nuevoId);

    const membresia = await membresiaRepository.obtenerPorId(nuevoId);
    console.log('Membresía encontrada:', membresia);

    const conUsuario = await membresiaRepository.obtenerConUsuario(nuevoId);
    console.log('Membresía con datos del usuario:', conUsuario);

    const activa = await membresiaRepository.obtenerActivaPorUsuario(5);
    console.log('Membresía activa del usuario 5:', activa);

    await membresiaRepository.eliminar(nuevoId);
    console.log('Membresía de prueba eliminada');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

probar();
