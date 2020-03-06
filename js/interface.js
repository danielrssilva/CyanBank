const conta = new ContaPoupanca()
class Interface{
    constructor(){
        this.quantityInput = document.getElementById('value')
        this.alertText = document.getElementById('alert')
        this.saldoLabel =  document.getElementById('saldo')
        this.extratoTable = document.getElementById('transactions-table')
        this.extratoButton = document.getElementById('extrato-button')

        this.esconderSaldo = true//Controle de visualização na interface
        this.esconderExtrato = true
    }
    realizarSaque(){
        var valor = this.getQuantityInputValue()
        if((valor > 0 || valor < 0) && valor%10 == 0){
            try{
                var today = new Date()
                var timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                conta.sacar(valor, timeStamp)
                this.changeTransactionDescription("saque", valor, timeStamp, null)
                if(!this.getEsconderExtrato())
                    this.updateExtrato()
                if(!this.getEsconderSaldo())
                    this.updateSaldo()
            }catch(e){
                this.changeTransactionDescription(null, null, null, e)
            }
        }else{
            this.changeTransactionDescription(null, null, null, "")
        }
        this.setQuantityInputValue('')
    }
    realizarDeposito(){
        var valor = this.getQuantityInputValue()
        if(valor > 0 || valor < 0){
            try{
                var today = new Date()
                var timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                conta.depositar(parseFloat(valor), timeStamp)
                this.changeTransactionDescription("deposito", valor, timeStamp, null)
                if(!this.getEsconderExtrato())
                    this.updateExtrato()
                if(!this.getEsconderSaldo())
                    this.updateSaldo()
            }catch(e){
                this.changeTransactionDescription(null, null, null, e)
            }
        }else{
            this.changeTransactionDescription(null, null, null, "")
        }    
        this.setQuantityInputValue('')
    }
    pagarBoleto(){
        var valor = this.getQuantityInputValue()
        if(valor > 0 || valor < 0){
            try{
                var today = new Date()
                var timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                bol.setValor(valor)
                bol.setData(timeStamp)
                this.setQuantityInputValue('')
                conta.pagamentoBoleto(bol)
                if(!this.getEsconderExtrato())
                    this.updateExtrato()
                if(!this.getEsconderSaldo())
                    this.updateSaldo()
            }catch(e){
                this.changeTransactionDescription(null, null, null, e)
            }
        }else{
            this.changeTransactionDescription(null, null, null, "")
        }
        this.setQuantityInputValue('')
    }
    mostrarExtrato(){
        if(this.getEsconderExtrato() == true){
            this.changeTableDisplayState('inline-block')
            this.setEsconderExtrato(false)
            this.updateExtrato()
            this.changeExtratoButton("Esconder extrato") 
        }else{
            this.changeExtratoButton("Mostrar extrato") 
            this.getExtratoTable().innerHTML = "";
            this.changeTableDisplayState('none')
            this.setEsconderExtrato(true)
        }
    }
    updateExtrato(){
        var extrato = conta.getExtrato()
        this.getExtratoTable().innerHTML = 
            "<tr>"+
                "<th>Transação</th>"+
                "<th>Valor</th>"+
                "<th>Horário</th>"+
            "</tr>"
        if(extrato.length != 0){
            extrato.forEach(e =>{
                this.getExtratoTable().innerHTML += 
                "<tr>"+
                    "<td class='type'>"+
                        e.type+
                    "</td>"+
                    "<td class='"+e.type+"'>"+
                        e.value+
                    "</td>"+
                    "<td class='time'>"+
                        e.date+
                    "</td>"+
                "</tr>"
            })
        }else{
            this.getExtratoTable().innerHTML = 'Não foram encontradas transações'
        }
    }
    showSaldo(){ 
        if(this.getEsconderSaldo() == true){ 
            this.setEsconderSaldo(false)
            this.updateSaldo()
        }else{
            this.setEsconderSaldo(true)
            this.updateSaldo()
            this.setSaldoLabel('Mostrar saldo')
        }
    }
    updateSaldo(){
        var saldo = conta.getSaldo()
        if(saldo > 0)
            this.setSaldoLabel("<span class='green'>R$"+saldo+"</span>")
        else if(saldo <= 0)
            this.setSaldoLabel("<span class='red'>R$"+saldo+"</span>")
    }

    changeExtratoButton(val){
        this.extratoButton.value = val
    }
    changeTransactionDescription(type, value, timeStamp, error){
        if(error == null)
            this.alertText.innerHTML = "Última transação: "+type+" de R$"+value+" - Horário: "+timeStamp
        else if(error == "")
            this.alertText.innerHTML = "<p class='red'>Valor inserido inválido.</p"
        else
            this.alertText.innerHTML = "<p class='red'>"+error+"</p>"
    }
    changeTableDisplayState(val){
        this.extratoTable.style.display = val
    }
    getExtratoTable(){
        return this.extratoTable
    }
    setQuantityInputValue(value){
        this.quantityInput.value = value
    }
    getQuantityInputValue(){
        return this.quantityInput.value
    }
    getEsconderSaldo(){
        return this.esconderSaldo
    }
    getEsconderExtrato(){
        return this.esconderExtrato
    }
    setEsconderExtrato(val){
        this.esconderExtrato = val
    }
    setEsconderSaldo(val){
        this.esconderSaldo = val
    }
    setSaldoLabel(val){
        this.saldoLabel.innerHTML = val 
    }
}
const UInterface = new Interface()
showConta = function(){
    contaLabel = document.getElementById('numconta')
    nums = conta.getNum();
    for(var i = 0; i<10; i++){
        if(i == 2 || i == 5)
            contaLabel.innerHTML += nums[i]+"."
        else if(i == 8)
            contaLabel.innerHTML += nums[i]+'-'
        else
            contaLabel.innerHTML += nums[i]
    }
}();