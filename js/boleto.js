class Boleto{
    constructor(){
        this.codigo = []
        this.valor = 0
        this.data = ""
        this.setCodigo()
    }
    setCodigo(){
        for(var i = 0; i<15; i++){
            this.codigo.push(Math.floor(Math.random() * (10 - 1)) + 1)
        }
    }
    getValor(){
        return this.valor
    }
    getData(){
        return this.data
    }

    setValor(val){
        this.valor = val
    }
    setData(val){
        this.data = val
    }
}