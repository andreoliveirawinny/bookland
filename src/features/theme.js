export default {
  container: {
    position: 'relative'
  },
  input: {
    width: '35em',
    height: '3em',
    padding: '0pc 7px',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 14,
    border: '1px solid #aaa',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputFocused: {
    outline: 'none',
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    overflow: 'auto',
    maxHeight: '26em',
    top: 42,
    width: 490,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};
