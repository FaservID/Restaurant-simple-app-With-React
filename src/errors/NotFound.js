import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="mt-4 text-center">
        <Image src="assets/images/not_found.png" width="600" className='img-fluid'/>
        <h2>404 NOT FOUND</h2>
        <p>Oppsss, Halaman Tidak Ditemukan</p>
        <Button variant="primary" className="mt-5" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
}

export default NotFound;
