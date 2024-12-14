import colors from 'colors';

export const routerPETS = (req, res, next) => {
    console.log(`> PETS Router...`.blue);
    next();
};

export const routerUSERS = (req, res, next) => {
    console.log(`> USERS Router...`.blue);
    next();
};

export const routerADOPTIONS = (req, res, next) => {
    console.log(`> ADOPTIONS Router...`.blue);
    next();
};

export const routerSESSIONS = (req, res, next) => {
    console.log(`> SESSIONS Router...`.blue);
    next();
};

export const routerMOCKS = (req, res, next) => {
    console.log(`> MOCKS Router...`.blue);
    next();
};