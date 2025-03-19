import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  paginationPosition: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    //marginTop: '-15%',
  },
  selectPosition: {
    padding: '-12px -12px'
  },
  inputPosition:{
    marginTop:'4%',
    float: 'right',
    fontFamily:'unset',
    fontSize:'small',
    color:'#FF000'
  }
}));

export default useStyles