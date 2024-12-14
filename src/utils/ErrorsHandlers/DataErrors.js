//Manejo de Errores.3.

export const errorArgsUser = (data) => {
    let { first_name, last_name, email, password, ...others } = data
    return `Error en carga de datos.  Datos requeridos:
    - first_name, type string: se recibió "${first_name}"
    - last_name, type string: se recibió "${last_name}"
    - email, type string: se recibió "${email}"
    - password, type string: se recibió "${password}"
Datos opcionales: 
    - role, se recibió ${JSON.stringify(others)}`
}

export const errorArgsPet = (data) => {
    let { name, specie, ...others } = data
    return `Error en carga de datos.  Datos requeridos:
    - name, type string: se recibió ${name}
    - specie, type string: se recibió ${specie}
Datos opcionales: 
    - birthDate, adopted, owner, image se recibió ${JSON.stringify(others)}`
}