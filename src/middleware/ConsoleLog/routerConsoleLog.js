import colors from 'colors';

export const routerPETS = (req, res, next) => {
    
    req.logger.debug(`> PETS Router...`);
    next();
};

export const routerUSERS = (req, res, next) => {
    
    req.logger.debug(`> USERS Router...`);
    next();
};

export const routerADOPTIONS = (req, res, next) => {
    
    req.logger.debug(`> ADOPTIONS Router...`);
    next();
};

export const routerSESSIONS = (req, res, next) => {
    
    req.logger.debug(`> SESSIONS Router...`);
    next();
};

export const routerMOCKS = (req, res, next) => {
    
    req.logger.debug(`> MOCKS Router...`);
    next();
};