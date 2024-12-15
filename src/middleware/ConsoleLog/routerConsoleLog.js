import colors from 'colors';

export const routerPETS = (req, res, next) => {
    //console.log(`> PETS Router...`.blue);
    req.logger.debug(`> PETS Router...`);
    next();
};

export const routerUSERS = (req, res, next) => {
    //console.log(`> USERS Router...`.blue);
    req.logger.debug(`> USERS Router...`);
    next();
};

export const routerADOPTIONS = (req, res, next) => {
    //console.log(`> ADOPTIONS Router...`.blue);
    req.logger.debug(`> ADOPTIONS Router...`);
    next();
};

export const routerSESSIONS = (req, res, next) => {
    //console.log(`> SESSIONS Router...`.blue);
    req.logger.debug(`> SESSIONS Router...`);
    next();
};

export const routerMOCKS = (req, res, next) => {
    //console.log(`> MOCKS Router...`.blue);
    req.logger.debug(`> MOCKS Router...`);
    next();
};