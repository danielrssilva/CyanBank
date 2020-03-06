class Conta { 
    constructor() { 
        this.numero = []; 
        this.saldo = 0
        this.limite = 500
        this.extrato = []
        this.setContaNum()
    }
    setContaNum(){
        for(var i = 0; i<10; i++){
            this.numero.push(Math.floor(Math.random() * (10 - 1)) + 1)
        }
    }
    sacar(valor, data){
        if(valor > (this.saldo + this.limite))
            throw("Limite insuficiente!")
        else{
            this.saldo -= valor
            this.extrato.push({
                type: 'saque',
                value: valor,
                date: data
            })
            return this.getSaldo()
        }
    }
    depositar(valor, data) { 
        if(valor < 50)
            throw("Não dá, bobão!")
        else{
            this.saldo += valor
            this.extrato.push({
                type: 'deposito',
                value: valor,
                date: data
            })
            return this.getSaldo()
        }
    }
    pagamentoBoleto(boleto){
        var valor = boleto.getValor()
        if(valor > (this.saldo + this.limite))
            throw("Limite insuficiente!")
        else{
            this.saldo -= valor
            this.extrato.push({
                type: 'boleto',
                value: valor,
                date: boleto.getData()
            })
            return this.getSaldo()
        }
    }
    getSaldo() {
        return this.saldo;
    }
    getExtrato(){
        return this.extrato
    }
    getNum(){
        return this.numero
    }
} 

class ContaPoupanca extends Conta { 
    atualizar(indice) { 
        this.saldo += this.saldo * indice
        console.log(this.getSaldo())
    }
}