import React from 'react';

class ScrollTop extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      document.getElementById('back-to-top').style.display = 'block';
    } else {
      document.getElementById('back-to-top').style.display = 'none';
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Para un desplazamiento suave
    });
  };

  render() {
    return (
      <a
        id="back-to-top"
        className="btn btn-primary back-to-top"
        role="button"
        aria-label="Scroll to top"
        onClick={this.scrollToTop} // Utiliza el nombre correcto de la función aquí
        style={{ display: 'none' }}
      >
        <i className="fas fa-chevron-up" />
      </a>
    );
  }
}

export default ScrollTop;
