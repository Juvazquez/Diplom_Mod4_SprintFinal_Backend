import { connectDB } from '../config/dbConfig.mjs';
import Permission from '../models/Permission.mjs';
import Role from '../models/Role.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

// Permisos iniciales
const initialPermissions = [
  { name: 'read:paises', description: 'Leer países' },
  { name: 'create:paises', description: 'Crear países' },
  { name: 'update:paises', description: 'Actualizar países' },
  { name: 'delete:paises', description: 'Eliminar países' }
];

// Roles iniciales con permisos
const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:paises']
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: ['read:paises', 'create:paises', 'update:paises']
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:paises', 'create:paises', 'update:paises', 'delete:paises']
    }
];


async function initializeRolesAndPermissions() {
  try {
    await connectDB();
    console.log('Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Permission.deleteMany({});
    await Role.deleteMany({});
    console.log('Colecciones limpiadas');

    // Crear permisos
    const createdPermissions = await Permission.insertMany(initialPermissions);
    console.log('Permisos creados exitosamente');

    // Crear mapa de permisos
    const permissionsMap = createdPermissions.reduce((map, permission) => {
      map[permission.name] = permission._id;
      return map;
    }, {});

    // Crear roles con referencias a permisos
    const rolesToCreate = initialRoles.map(role => ({
      ...role,
      permissions: role.permissions.map(name => permissionsMap[name])
    }));

    await Role.insertMany(rolesToCreate);
    console.log('Roles creados exitosamente');
  } catch (error) {
    console.error('Error al inicializar roles y permisos:', error);
  }
}


// ✅ Verificación de "main module"  sirve para ejecutar el script directamente
//Sirve para que no se ejecute la función al importar el módulo desde otra parte del proyecto.
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  initializeRolesAndPermissions().then(() => {
    console.log('Inicialización completada');
    process.exit(0);
  });
}
