import { React, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import Login from './login'
import Signup from './register'
import { useNavigate } from 'react-router-dom'

const AuthPages = () => {
  const navigate = useNavigate()
  const [currentContainer, setCurrentContainer] = useState(false)

  useEffect(() => {
    // cek jika user sudah terotentikasi
    let isAuth = sessionStorage.getItem('logged')
    if (isAuth) {
      //arahkan user kembali ke dashboard jika sudah login
      navigate({ pathname: './dashboard' }) 
    }
  }, [navigate])

  return (
    <div className={`auth-pages`}>
      <Row>
        <Col md="12" lg="6" sm="12" xs="12" className="div-center">
          <div className='div-text-center'>
          </div>
          <div className="card-auth-page">
              <div className={`card-inner`}>
              <h4 className='text-center'>Selamat Datang</h4>
                {
                  currentContainer ?
                    <div className={`card-register `}>
                      <h3 className='text-center'>Silahkan</h3>
                      <h3 className='text-center'>Daftar</h3>
                      <Signup setCurrentContainer={setCurrentContainer} />
                      <button className="btn-chang-container" onClick={() => setCurrentContainer(false)}> Sudah punya Akun?</button>
                    </div> :
                    <div className={`card-login`}>
                      <h3 className='text-center'>Silahkan</h3>
                      <h3 className='text-center'>Login</h3>
                      <Login />
                      <button className="btn-chang-container"  onClick={() => setCurrentContainer(true)}>Daftar</button>
                    </div>
                }
              </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AuthPages;