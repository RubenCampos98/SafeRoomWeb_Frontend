export default function authHeader(){
  const utilizador = JSON.parse(localStorage.getItem('utilizador'));
  if(utilizador && utilizador.token){
      return{
          Authorization: 'Bearer ' + utilizador.token
      };
  } else {
      return{};
  }
}