import styles from './header.module.css';

const Header = () => {
    return (
       <header className='container-fluid'>
         <div className={`row ${styles['bg-nav']} py-3 px-1`}>
            <div className="col-3 p-0">
                <img className="img-fluid" src="assets/logo.png" alt="Logo" style={{ maxHeight: '60px' }} />
            </div>
            <div className="col-9 flex-grow-1 d-flex justify-content-end align-items-center p-0">
                <h1 className="text-end pe-2 ">Plantilla del Barça</h1> 
            </div>
          </div>
       </header>
    );
};

export default Header;
