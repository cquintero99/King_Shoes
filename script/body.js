function cargarBody(){
    body= 
    `
    <div>
      <div class="flitro abs-center">

        <!--Texto & img Bandera-->
        <p> NUESTRO PROPOSITO ES DAR A CONOCER EL TALENTO DE LOS ZAPATOS DE NUESTRO PAIS <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/200px-Flag_of_Colombia.svg.png"
            alt="" width="50px" height="40px"></p>
      </div>

      <!--Contendor Columns "Equal-width " Bootstrap "/2 3/3" -->
      <div class="container-sm">
        <!--col-1/2-->
        <div class="row ">


          <div class="col">
            <div class="abs-center">
              <div class="card colorBlack text-bg-dark" style="width: 25rem;">
                <img src="http://ekladata.com/chYAkWyXcQV5eOVWg5h4EFcS4yw.jpg " width="400" height="300"
                  class="card-img-top">
                <div class="card-body text-center">
                  <h5 class="card-title">Comprar</h5>
                  <p class="card-text">Puedes Comprar Todo tipo de zapatos nacionales <br>Diferentes medios de pago
                    <br>cotacto KingShoesColombia@gmail.com
                  </p>
                  <div class="col_carrusel">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#exampleModalI">
                      Mas Informacion
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Button trigger modal -->


          <!-- Modal -->
          <div class="modal " id="exampleModalI" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog ">
              <div class="modal-content text-center text-bg-light">
                <div class="modal-header text-center">

                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h1>KING SHOES</h1>
                  <h5>Es un ecommerce website de ventas de zapatos </h5>
                  <h5>Contamos con las siguientes categorias</h5>
                  <br>
                  <div class="container text-center">
                    <div class="row text-center border border-dark">
                      <div class="col text-bg-light  text-center">
                        <h3><a href="#" class="text-decoration-none" data-bs-dismiss="modal" type="button"
                            onclick="mostrarCategoria('hombre')">HOMBRE</a></h3>
                      </div>

                    </div>
                    <div class="row  text-center border border-dark">
                      <div class="col text-bg-light text-center">
                        <h3><a href="#" class="text-decoration-none" data-bs-dismiss="modal" type="button"
                            onclick="mostrarCategoria('mujer')">MUJER</a></h3>
                      </div>

                    </div>
                    <div class="row  text-center border border-dark">
                      <div class="col text-bg-light text-center">
                        <h3><a href="#" class="text-decoration-none" data-bs-dismiss="modal" type="button"
                            onclick="mostrarCategoria('niño')">NIÑO</a></h3>
                      </div>

                    </div>
                    <div class="row  text-center border border-dark">
                      <div class="col text-bg-light text-center">
                        <h3><a href="#" class="text-decoration-none" data-bs-dismiss="modal" type="button"
                            onclick="mostrarCategoria('niña')">NIÑA</a></h3>
                      </div>

                    </div>



                  </div>





                </div>
                <div class="modal-footer">

                </div>
              </div>
            </div>
          </div>
          <!--col 2/2-->
          <div class="col">
            <div class="abs-center">
              <div class="card colorBlack text-bg-dark" style="width: 25rem;">
                <img src="https://www.themarkethink.com/wp-content/uploads/2020/08/mi-tienda-online-belcorp.jpg"
                  width="400" height="300" class="card-img-top">
                <div class="card-body text-center">
                  <h5 class="card-title">Vender</h5>
                  <p class="card-text">En king Shoes puedes ofrecer tus productos de manera online muy facil y rapida
                    <br>Solo tienes que resgistrarte.
                  </p>
                  <div class="col_carrusel">
                    <a href="#" type="button" class="btn btn-primary" id="cuentaTienda2">Mas Informacion</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>



        <div class="row">

          <div class="text-bg-dark colorBlack p-3 text-center ">
            <h1>NUESTRAS TIENDAS</h1>
          </div>

          <div id="carouselExampleDark" class="carousel carousel-dark slide border border-dark p-3"
            data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="10000">
                <img src="https://www.plazalaserrezuela.com/wp-content/uploads/2020/10/mario-hernandez-logo.png"
                  class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Mario Hernandez</h5>
                  <p>Conoce toda la elegancia y comodidad que te otorgan los zapatos para hombre de Mario Hernàndez.
                    Cada
                    diseños está confeccionado con materiales de alta calidad y desempeño.</p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="https://unicentrodearmenia.com/wp-content/uploads/2018/06/bosi-logo.png" class="d-block w-100"
                  alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Bosi</h5>
                  <p>Descubre las últimas tendencias en calzado, chaquetas de cuero, maletines y mucho más.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/LOGO_MARCA_V%C3%89LEZ.png"
                  class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Velez</h5>
                  <p>En Vélez somos amantes del cuero, encuentra en la Tienda Online calzado, bolsos, maletas,
                    billeteras,
                    chaquetas de cuero, tenis</p>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>


          </div>



          <br>
        </div>
        
        <!--col 3/3-->
        <div class="row  border border-dark">
          <!--col 1/3-->
          <div class=" text-bg-dark colorBlack p-3 text-center">
            <h1>CATEGORIAS DISPONIBLES</h1>
          </div>
            <div class="col">

              <div class="p-3">
                <h1><a href="#" class="text-decoration-none" onclick="mostrarCategoria('hombre')">HOMBRE</a></h1>
              </div>

              <!--carrusel-->
              <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="true">

                <div class="carousel-inner">
                  <div class="carousel-item ">
                    <img src="https://static.dafiti.com.co/p/adidas-performance-0231-3557291-1-zoom.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item active">
                    <img src="https://static.dafiti.com.co/p/hugo-boss-0062-1591102-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="https://static.dafiti.com.co/p/lacoste-0357-4250202-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>


              </div>
            </div>
            <!--col "2/3"-->
            <div class="col">
              <div class="p-3">
                <h1><a href="#" class="text-decoration-none" onclick="mostrarCategoria('mujer')">MUJER</a></h1>
              </div>
              <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="true">

                <div class="carousel-inner">
                  <div class="carousel-item ">
                    <img src="https://static.dafiti.com.co/p/reebok-8564-8748771-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item active">
                    <img src="https://static.dafiti.com.co/p/tellenzi-3625-6892091-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="https://static.dafiti.com.co/p/nike-6120-6537102-1-catalog-new.jpg" class="d-block w-100"
                      alt="...">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>


              </div>


            </div>
            <!--col 3/3-->
            <div class="col">
              <div class="p-3">
                <h1><a href="#" class="text-decoration-none" onclick="mostrarCategoria('niño')">NIÑO</a></h1>
              </div>
              <div id="carouselExampleIndicators3" class="carousel slide" data-bs-ride="true">

                <div class="carousel-inner">
                  <div class="carousel-item ">
                    <img src="https://static.dafiti.com.co/p/tellenzi-9072-1025481-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item active">
                    <img src="https://static.dafiti.com.co/p/ipanema-6897-7542602-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="https://static.dafiti.com.co/p/los-gomosos-5878-7132181-1-catalog-new.jpg"
                      class="d-block w-100" alt="...">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators3"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators3"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>



              </div>

            </div>
          

        </div>
        <br>

        <div class="row">
          <div class="text-bg-dark colorBlack p-3 text-center">
            <h1>PROMOCIONES</h1>
          </div>
          <div class="border border-dark">
            <img src="https://www.isidroperez.com/wp-content/uploads/2017/12/descuentos1.jpg.webp" class="img-fluid"
            alt="...">
            <marquee behavior="scroll" direction="left"><img
                src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif" width="194" height="188"
                alt="Swimming fish" /></marquee>
           
          </div>
        </div>
      </div>
      <br>








      <!--Boton de Siguiente pagina-->
      <br>
      <div class="col_carrusel p-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>



    </div> 
    `
    document.getElementById("container").innerHTML=body;
}