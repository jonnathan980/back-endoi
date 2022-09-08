import Produto from "./Produto"

type Cardapio = {
  id: number
  nome: string
  id_bar: number
  produtos?: Produto[]
}
 
export default Cardapio