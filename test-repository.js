const usuarioRepository = require('./src/repositories/usuario.repository');

async function probar() {
    try {
        // Crear un usuario de prueba
        const nuevoId = await usuarioRepository.crear({
            nombre: 'Liliana Test',
            correo: 'liliana.test@example.com',
            contrasena: '123456hasheado',
            rol_id: 2 // cliente, según el seed del init.sql
        });
        console.log('Usuario creado con id:', nuevoId);

        // Consultar por id
        const usuario = await usuarioRepository.obtenerPorId(nuevoId);
        console.log('Usuario encontrado:', usuario.toJSON());

        // Consultar todos
        const todos = await usuarioRepository.obtenerTodos();
        console.log('Total de usuarios:', todos.length);

        // Actualizar
        await usuarioRepository.actualizar(nuevoId, {
            nombre: 'Liliana Actualizada',
            correo: 'liliana.test@example.com',
            rol_id: 2
        });
        const actualizado = await usuarioRepository.obtenerPorId(nuevoId);
        console.log('Usuario actualizado:', actualizado.toJSON());

        // Eliminar (limpieza)
        await usuarioRepository.eliminar(nuevoId);
        console.log('Usuario de prueba eliminado');

        process.exit(0);
    } catch (error) {
        console.error('Error en la prueba:', error.message);
        process.exit(1);
    }
}

probar();
