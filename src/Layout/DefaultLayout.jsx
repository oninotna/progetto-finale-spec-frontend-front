import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useBikesContext } from "../Contexts/BikesContext";


// import AnimatedBackground from './AnimatedBackground';

export default function DefaultLayout () {
    const { bikeIds } = useBikesContext();
    const navigate = useNavigate();

    
    return (
        <div className='vh-100 d-flex flex-column'>
            <nav className="navbar navbar-expand-md "
                style={{
                position: 'fixed',
                width: '100%',
                // height: '70px'
            }}>
                <div className="container-fluid">
                    <h1 className='text-light' onClick={() => navigate('/')} style={{cursor: 'pointer'}}>BikeShowRoom</h1>
                    <button 
                        className="navbar-toggler m-2" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbar" 
                        aria-controls="navbar" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbar">
                        <NavLink className='btn btn-light my-2 me-3' to='/'>Home</NavLink>
                        <NavLink className='btn btn-light my-2 me-3' to='/wishlist-page'>Wishlist</NavLink>
                        <NavLink 
                            className={bikeIds.length < 2 ? 'd-none' : 'btn btn-light my-2 me-3'} 
                            to='/comparison-page'>Pagina di confronto</NavLink>
                    </div>
                </div>
            </nav>

            {/* <AnimatedBackground /> */}
            <main className='flex-grow-1' style={{ paddingTop: '50px'}}>      
                <Outlet />
            </main>

            <footer className='mt-auto py-3 bg-secondary' style={{backgroundColor: 'lightgray'}}>
                <p className='text-center text-light fst-italic pt-2'>Powered by, Antonino Musarra Tubbi</p>
            </footer>
        </div>
    );
};