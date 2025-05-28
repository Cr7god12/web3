<template>
  <div>
    <h2>Ciudades</h2>

    <button @click="abrirModal()">Agregar Ciudad</button>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Población</th>
          <th>Región</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ciudad in ciudades" :key="ciudad.id_ciudad">
          <td>{{ ciudad.nombre }}</td>
          <td>{{ ciudad.poblacion }}</td>
          <td>{{ ciudad.region }}</td>
          <td>{{ obtenerNombrePais(ciudad.id_pais) }}</td>
          <td>
            <button @click="editar(ciudad)">Editar</button>
            <button @click="eliminar(ciudad.id_ciudad)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-if="mostrarModal" @close="cerrarModal">
      <h3>{{ editando ? 'Editar Ciudad' : 'Agregar Ciudad' }}</h3>
      <form @submit.prevent="guardarCiudad">
        <input
          v-model="nuevaCiudad.nombre"
          placeholder="Nombre de la ciudad"
          required
          autocomplete="off"
        />
        <input
          type="number"
          v-model.number="nuevaCiudad.poblacion"
          placeholder="Población"
          min="1"
          required
        />
        <input
          v-model="nuevaCiudad.region"
          placeholder="Región"
          required
          autocomplete="off"
        />

        <select v-model="nuevaCiudad.id_pais" required>
          <option value="">Selecciona un país</option>
          <option v-for="pais in paises" :key="pais.id_pais" :value="pais.id_pais">
            {{ pais.nombre }}
          </option>
        </select>

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
      ciudades: [],
      paises: [],
      nuevaCiudad: {
        nombre: '',
        poblacion: '',
        region: '',
        id_pais: ''
      },
      editando: false,
      idEditando: null,
      mostrarModal: false
    }
  },
  mounted() {
    this.cargarCiudades()
    this.cargarPaises()
  },
  methods: {
    async cargarCiudades() {
      try {
        const res = await axios.get('http://localhost:3000/api/ciudades')
        this.ciudades = res.data
      } catch (error) {
        alert('Error cargando ciudades')
      }
    },
    async cargarPaises() {
      try {
        const res = await axios.get('http://localhost:3000/api/paises')
        this.paises = res.data
      } catch (error) {
        alert('Error cargando países')
      }
    },
    obtenerNombrePais(id) {
      const pais = this.paises.find(p => p.id_pais === id)
      return pais ? pais.nombre : 'Desconocido'
    },
    abrirModal() {
      this.mostrarModal = true
      this.editando = false
      this.nuevaCiudad = { nombre: '', poblacion: '', region: '', id_pais: '' }
    },
    cerrarModal() {
      this.mostrarModal = false
    },
    async guardarCiudad() {
      const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,100}$/

      if (
        !regexTexto.test(this.nuevaCiudad.nombre) ||
        !regexTexto.test(this.nuevaCiudad.region) ||
        !this.nuevaCiudad.id_pais ||
        !Number.isInteger(this.nuevaCiudad.poblacion) ||
        this.nuevaCiudad.poblacion <= 0
      ) {
        alert('Datos inválidos. Verifica los campos.')
        return
      }

      try {
        if (this.editando) {
          await axios.put(`http://localhost:3000/api/ciudades/${this.idEditando}`, this.nuevaCiudad)
        } else {
          await axios.post('http://localhost:3000/api/ciudades', this.nuevaCiudad)
        }
        this.cargarCiudades()
        this.cerrarModal()
      } catch (error) {
        alert('Error guardando la ciudad')
      }
    },
    editar(ciudad) {
      this.nuevaCiudad = { ...ciudad }
      this.idEditando = ciudad.id_ciudad
      this.editando = true
      this.mostrarModal = true
    },
    async eliminar(id) {
      if (confirm('¿Seguro que deseas eliminar esta ciudad?')) {
        try {
          await axios.delete(`http://localhost:3000/api/ciudades/${id}`)
          this.cargarCiudades()
        } catch (error) {
          alert('Error eliminando la ciudad')
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
input, select {
  margin-bottom: 10px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
}
</style>
