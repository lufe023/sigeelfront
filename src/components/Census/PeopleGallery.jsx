import React from 'react'

$(function () {
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        alwaysShowClose: true
      });
    });

    $('.filter-container').filterizr({gutterPixels: 3});
    $('.btn[data-filter]').on('click', function() {
      $('.btn[data-filter]').removeClass('active');
      $(this).addClass('active');
    });
  })

  
const PeopleGallery = () => {
  return (
    <div className="row">
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FFFFFF.png?text=1" data-toggle="lightbox" data-title="sample 1 - blanco" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FFFFFF?text=1" className="img-fluid mb-2" alt="white sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/000000.png?text=2" data-toggle="lightbox" data-title="sample 2 - black" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/000000?text=2" className="img-fluid mb-2" alt="black sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=3" data-toggle="lightbox" data-title="sample 3 - red" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=3" className="img-fluid mb-2" alt="red sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=4" data-toggle="lightbox" data-title="sample 4 - red" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=4" className="img-fluid mb-2" alt="red sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/000000.png?text=5" data-toggle="lightbox" data-title="sample 5 - black" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/000000?text=5" className="img-fluid mb-2" alt="black sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FFFFFF.png?text=6" data-toggle="lightbox" data-title="sample 6 - white" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FFFFFF?text=6" className="img-fluid mb-2" alt="white sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FFFFFF.png?text=7" data-toggle="lightbox" data-title="sample 7 - white" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FFFFFF?text=7" className="img-fluid mb-2" alt="white sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/000000.png?text=8" data-toggle="lightbox" data-title="sample 8 - black" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/000000?text=8" className="img-fluid mb-2" alt="black sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=9" data-toggle="lightbox" data-title="sample 9 - red" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=9" className="img-fluid mb-2" alt="red sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FFFFFF.png?text=10" data-toggle="lightbox" data-title="sample 10 - white" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FFFFFF?text=10" className="img-fluid mb-2" alt="white sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/FFFFFF.png?text=11" data-toggle="lightbox" data-title="sample 11 - white" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/FFFFFF?text=11" className="img-fluid mb-2" alt="white sample" />
      </a>
    </div>
    <div className="col-sm-2">
      <a href="https://via.placeholder.com/1200/000000.png?text=12" data-toggle="lightbox" data-title="sample 12 - black" data-gallery="gallery">
        <img src="https://via.placeholder.com/300/000000?text=12" className="img-fluid mb-2" alt="black sample" />
      </a>
    </div>
                </div>
  )
}

export default PeopleGallery