<template>
  <div>
    <h2>Países</h2>

    <button @click="abrirModal()">Agregar País</button>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Capital</th>
          <th>Continente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pais in paises" :key="pais.id_pais">
          <td>{{ pais.nombre }}</td>
          <td>{{ pais.capital }}</td>
          <td>{{ pais.continente }}</td>
          <td>
            <button @click="editar(pais)">Editar</button>
            <button @click="eliminar(pais.id_pais)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-if="mostrarModal" @close="cerrarModal">
      <h3>{{ editando ? 'Editar País' : 'Agregar País' }}</h3>
      <form @submit.prevent="guardarPais">
        <input
          v-model="nuevoPais.nombre"
          placeholder="Nombre del país"
          required
          autocomplete="off"
        />
        <input
          v-model="nuevoPais.capital"
          placeholder="Capital"
          required
          autocomplete="off"
        />
        <input
          v-model="nuevoPais.continente"
          placeholder="Continente"
          required
          autocomplete="off"
        />
        <div style="margin-top:10px;">
          <button type="submit">{{ editando ? 'Actualizar' : 'Agregar' }}</button>
          <button type="button" @click="cerrarModal" style="margin-left: 10px;">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal.vue'

export default {
  components: { Modal },
  data() {
    return {
      paises: [],
      nuevoPais: {
        nombre: '',
        capital: '',
        continente: ''
      },
      editando: false,
      idEditando: null,
      mostrarModal: false
    }
  },
  mounted() {
    this.cargarPaises()
  },
  methods: {
    async cargarPaises() {
      try {
        const res = await axios.get('http://localhost:3000/api/paises')
        this.paises = res.data
      } catch (error) {
        alert('Error cargando países')
      }
    },
    abrirModal() {
      this.mostrarModal = true
      this.editando = false
      this.nuevoPais = { nombre: '', capital: '', continente: '' }
    },
    cerrarModal() {
      this.mostrarModal = false
    },
    async guardarPais() {
      const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,100}$/

      if (
        !regex.test(this.nuevoPais.nombre) ||
        !regex.test(this.nuevoPais.capital) ||
        !regex.test(this.nuevoPais.continente)
      ) {
        alert('Campos inválidos. Solo letras, espacios y acentos (entre 2 y 100 caracteres) y no se puede numeros.')
        return
      }

      try {
        if (this.editando) {
          await axios.put(`http://localhost:3000/api/paises/${this.idEditando}`, this.nuevoPais)
        } else {
          await axios.post('http://localhost:3000/api/paises', this.nuevoPais)
        }
        this.cargarPaises()
        this.cerrarModal()
      } catch (error) {
        alert('Error guardando el país')
      }
    },
    editar(pais) {
      this.nuevoPais = { ...pais }
      this.idEditando = pais.id_pais
      this.editando = true
      this.mostrarModal = true
    },
    async eliminar(id) {
      if (confirm('¿Seguro que deseas eliminar este país?')) {
        try {
          await axios.delete(`http://localhost:3000/api/paises/${id}`)
          this.cargarPaises()
        } catch (error) {
          alert('Error eliminando el país')
        }
      }
    }
  }
}
</script>

<style scoped>
button {
  padding: 6px 10px;
  margin-right: 5px;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
td, th {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
input {
  margin-bottom: 10px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
}
</style>
