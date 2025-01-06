



import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={`container-fluid ${styles['bg-footer']}  ` }>
            <div className="row p-3 d-flex justify-content-center">
                {/* Logo y Descripción */}
                <div className="col-lg-2 col-md-2 d-flex justify-content-center align-items-center  mb-3 mb-lg-0 ">
                    <img 
                        className="img-fluid" 
                        src="src/assets/logo.png" 
                        alt="Logo" 
                        style={{ maxHeight: '90px' }} 
                    />
                    
                </div>

                <div className="row col-lg-10 col-md-10">
                    <div className="col-lg-12 col-md-12 text-center mb-lg-0 d-flex justify-content-center align-items-center flex-column ">
                        <h6 className={`fw-semibold fs-5 ${styles['orbitron']}`}>
                            Plantilla del Barça - Proyecto para gestionar jugadores del FC Barcelona.
                        </h6>
                        <p className="fw-light my-2">Desarrollado por: <a href="https://github.com/ivandapacheco" target="_blank" className="text-reset  ">Ivanda Pacheco</a></p>
                        
                    </div>

                    {/* Redes Sociales */}
                    <div className="col-lg-12 text-center ">
                        {/* <h6 className="fw-semibol ">Sígueme</h6> */}
                        <div className="d-flex justify-content-center justify-content-lg-en gap-3 ">
                            <a 
                                href="https://www.linkedin.com/in/ivanda-pacheco/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`${styles['icon-social']} ${styles['linkedin']}`}>
                                <i className="fab fa-linkedin fs-4"></i>
                            </a>
                            <a 
                                href="https://github.com/ivandapacheco" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`${styles['github']}`}>
                                <i className="fab fa-github fs-4"></i>
                            </a>
                        </div>
                    </div>


                    {/* CopyRight */}
                    <div className="row mt-3">
                        <div className=" text-center">
                            <p className="small m-0">&copy; {new Date().getFullYear()} FC Barcelona. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </div>









                {/* Enlaces Rápidos */}
                {/* <div className="col-lg-4 col-md-6 text-center text-lg-start mb-3 mb-md-0">
                    <h5 className="mb-3">Enlaces Rápidos</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-reset text-decoration-none">Acerca de</a></li>
                        <li><a href="#" className="text-reset text-decoration-none">Contacto</a></li>
                        <li><a href="#" className="text-reset text-decoration-none">Términos y Condiciones</a></li>
                    </ul>
                </div> */}


                {/* Redes Sociales */}
                {/* <div className="col-lg-4 col-md-6 text-center text-lg-end">
                    <h5 className="mb-3">Sígueme</h5>
                    <div className="d-flex justify-content-center justify-content-lg-end gap-3">
                        <a 
                            href="https://www.linkedin.com/in/ivanda-pacheco/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${styles['icon-social']} ${styles['linkedin']}`}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a 
                            href="https://github.com/ivandapacheco" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${styles['icon-social']} ${styles['github']}`}>
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div> */}
            </div>



            {/* Desarrollado por: */}
            {/* <div className="row mt-2">
                <div className="col text-center">
                    <p className="small m-0">Desarrollado por: <a href="https://github.com/ivandapacheco" target="_blank" className="text-reset text-decoration-none">IvandaPacheco</a></p>
                </div>  
            </div> */}


            {/* CopyRight */}
            {/* <div className="row">
                <div className="col text-center">
                    <p className="small m-0">&copy; {new Date().getFullYear()} FC Barcelona. Todos los derechos reservados.</p>
                </div>
            </div> */}
            
        </footer>
    );
};

export default Footer;
