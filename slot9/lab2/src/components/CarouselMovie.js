import Carousel from "react-bootstrap/Carousel";

function CarouselMovie() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="/images/movie1.jpg"
          className="d-block w-100"
          alt="Galactic Wars"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Galactic Wars</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/movie2.jpg"
          className="d-block w-100"
          alt="Laugh Out Loud"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Laugh Out Loud</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/movie3.jpg"
          className="d-block w-100"
          alt="Deep Blue"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Deep Blue</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/movie4.jpg"
          className="d-block w-100"
          alt="Haunted House"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>Haunted House</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/movie5.jpg"
          className="d-block w-100"
          alt="City of Love"
          style={{ objectFit: "cover", height: "90vh" }}
        />
        <Carousel.Caption>
          <h3>City of Love</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselMovie;
