import PropTypes from 'prop-types';

const fotoType = PropTypes.shape({
  urlPerfil: PropTypes.string.isRequired,
  loginUsuario: PropTypes.string.isRequired,
  urlFoto: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  likeada: PropTypes.bool.isRequired,
  likers: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,
    }),
  ).isRequired,
  comentarios: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,

      texto: PropTypes.string.isRequired,
    }),
  ).isRequired,
});

export default fotoType;
