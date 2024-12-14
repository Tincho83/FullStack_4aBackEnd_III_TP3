//Manejo de Errores.4. 

export const ERROR_MESSAGES = {
    USER: {
        NAME_REQUIRED: "El nombre's del usuario es obligatorio.",
        EMAIL_REQUIRED: "El correo electrónico es obligatorio.",
        PASSWORD_REQUIRED: "Contraseña obligatoria.",
        USER_ALREADY_EXISTS: "El usuario ya existe.",
        INVALID_ID: "Id Invalido.",
        MISSING_FIELDS: "Faltan completar campos."
    },
    PET: {
        PET_NOT_FOUND: "La mascota no fue encontrada.",
        NAME_REQUIRED: "El nombre de la mascota es obligatorio.",
        INVALID_ID: "Id Invalido.",
        MISSING_FIELDS: "Faltan completar campos."
    },
    ADOPTION: {
        ADOPTION_LIMIT_REACHED: "El usuario ha alcanzado el límite de adopciones permitidas.",
    },
};

// Los errores comunes están centralizados en este diccionario