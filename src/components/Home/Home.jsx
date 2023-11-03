import Loging from '../Users/Loging'
import Quotes from './Quotes'
import AsideHome from './AsideHome'



const Home = () => {


  let VideoURL = 'video/politica2.mp4'
  return (
 <div className="layout-top-nav" >
 <video src={VideoURL} autoPlay={true} muted={true} loop={true} style={{marginLeft:0}}>
      
</video>
<div className="wrapper">
  {/* Navbar */}
 
 <AsideHome/>

  <div className="content-wrapper" style={{minHeight: '100vh', marginLeft:0, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
 
    {/* Content Header (Page header) */}
    <div className="content-header"> 
      <div className="container">
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <div className="content"  style={{minHeight: '100vh', marginTop:'40px'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="card" style={{minHeight:'40px'}}>
              <div className="card-body">
              {/* frases de liderazgo aleatorias*/}
                <Quotes/> 
              </div>
            </div>
            <div className="card">

            </div>
          
            {/* /.card */}
          </div>
          {/* /.col-md-6 */}
          <div className="col-lg-6" >
        <Loging/>
      </div>
          {/* /.col-md-6 */}
        </div>
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content */}
  </div>

  <footer className="main-footer" style={{marginLeft:0}}>
    {/* To the right */}
    <div className="float-right d-none d-sm-inline">
      
    </div>
    {/* Default to the left */}
    <strong>Copyright © 2019-2023 <a href="mailto:lufe023@gmail.com">MiElector</a>.</strong> All rights reserved.
  </footer>
</div>
</div>

  )
}

export default Home