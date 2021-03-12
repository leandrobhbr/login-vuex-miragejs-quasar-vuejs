<template>
  <div>
    <div class="q-mb-md">
      <b class="text-h5 text-weight-medium">Resumo da Compra</b><br>
    </div>
    <div v-if="verificaPacote()">
      <div class="row q-pa-sm">
        <div class="col-12 col-md-8 justify-around">
          <span>{{ pacote.sistemaSelecionado.nome }}</span><br>
          <span class="text-weight-light">{{ pacote.planoSelecionado.nome }}</span>
        </div>
        <div class="col-12 col-md-4">
          <span>{{ colocarMonetario(pacote.planoSelecionado.valor) }}</span><span class="text-weight-light text-subtitle2">/mês</span>
        </div>
      </div>
      <div v-if="pacote.adicionalSelecionado" class="row q-pa-sm">
        <div class="col-12 col-md-8 justify-around">
          <span>{{ pacote.adicionalSelecionado.nome }}</span><br>
          <span class="text-weight-light">{{ pacote.adicionalSelecionado.nomeAbreviado }}</span>
          <q-btn color="primary" icon="check" label="Remover" flat @click="$emit('removerAdicional')" />
        </div>
        <div class="col-12 col-md-4">
          <span >{{ colocarMonetario(pacote.adicionalSelecionado.valor) }}</span><span class="text-weight-light text-subtitle2">/mês</span>
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col-12 col-md-12 q-pa-sm">
          <hr>
        </div>
        <div class="col-12 col-md-8 justify-around">
          <span>Total</span><br>
        </div>
        <div class="col-12 col-md-4">
          <span>{{ colocarMonetario(calcularTotal) }}</span><span class="text-weight-light text-subtitle2">/mês</span>
        </div>
      </div>
    </div>
    <div v-else>
      <span class="text-subtitle">Selecione pelo menos um sistema e um plano</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pacote'],
  name: 'Resumo',
  data () {
    return {
      cupom: null
    }
  },
  computed: {
    calcularTotal () {
      return this.pacote.adicionalSelecionado ? this.pacote.adicionalSelecionado.valor + this.pacote.planoSelecionado.valor : this.pacote.planoSelecionado.valor
    }
  },
  methods: {
    verificaPacote () {
      return Boolean(this.pacote.sistemaSelecionado && this.pacote.planoSelecionado)
    },
    swap (str, swaps) {
      var reg = new RegExp('[' + Object.keys(swaps).join('') + ']', 'g')
      return str.replace(reg, function (x) { return swaps[x] })
    },
    colocarMonetario (val) {
      var money = `R$ ${new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(val).replace('R$', '')}`

      var map = {
        '.': ',',
        ',': '.'
      }
      return this.swap(money, map)
    }
  },
  mounted () {
    // console.log(this.pacote)
  }
}
</script>
