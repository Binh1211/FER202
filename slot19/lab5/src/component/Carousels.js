import Carousel from "react-bootstrap/Carousel";

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          src="/images/uthappizza.png"
          className="d-block w-100 mx-auto"
          alt="Uthappizza"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Uthappizza</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          src="/images/zucchipakoda.png"
          className="d-block w-100 mx-auto"
          alt="Zucchipakoda"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Zucchipakoda</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/vadonut.png"
          className="d-block w-100 mx-auto"
          alt="Vadonut"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Vadonut</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/elaicheesecake.png"
          className="d-block w-100 mx-auto"
          alt="ElaiCheese Cake"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>ElaiCheese Cake</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
