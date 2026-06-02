import { Request, Response, NextFunction } from "express";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void =>{
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    //validation error from mongodb
    if(err.name === 'validationError'){
        res.status(400).render('error',{ 
            title: 'Validation error',
            message: err.message,
            error: err
        });
        return
    }

    //fallback for unexpected error
    res.status(500).render('error', {
        title: 'Server Error',
        message: 'Something went wrong.',
        error: process.env.NODE_ENV === 'development' ? err: {}
    });
}

export default errorHandler;