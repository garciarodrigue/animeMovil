import '../styles/informacion.css'

export const Informacion = ()=>{
    return(
        <section className="Inforanime">
            <div className="Inforanime-punteo">
                <figure>
                    <img src="/svgs/star-icon.svg" alt="star" />
                    <img src="/svgs/star-icon.svg" alt="star" />
                    <img src="/svgs/star-icon.svg" alt="star" />
                    <img src="/svgs/star-icon.svg" alt="star" />
                    <img src="/svgs/star-icon.svg" alt="star" />
                </figure>
                <div>
                    <p><strong>Punteo:</strong>9999</p>
                </div>
            </div>
            <h1><strong>Nombre Original:</strong> Sward art online</h1>
            <section className="Inforanime-info">
                <div id='info'>
                    <h2>Sword Art  Online</h2>
                    <h5>Información</h5>
                    <p><strong>Genero:</strong> Acción, Aventura, Fantasía, Romance</p>
                    <div  className="Inforanime-info-text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolore facilis consequuntur esse, recusandae tempora nam libero ducimus facere doloribus voluptatem veniam repellat ex aut dignissimos vel architecto pariatur accusantium.</p>
                    </div>
                </div>
                <div className="Inforanime-info-img">
                    <figure>

                    </figure>
                    <div>
                        <p><strong>Tem/</strong> 4</p>
                        <p><strong>Cap/</strong> 100</p>
                        <p>En emisión</p>
                    </div>
                </div>



            </section>
            



            

        </section>


    );


}