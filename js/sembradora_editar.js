console.log(location.search)     // lee los argumentos pasados a este formulario
var id = location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            modelo: "",
            lineas: "",
            cajaCentral: "",
            ancho: "",
            stock: 0,
            precio: 0,
            imagen: "",
            url: 'https://indensigna.pythonanywhere.com/sembradoras/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.modelo = data.modelo;
                    this.lineas = data.lineas;
                    this.cajaCentral = data.cajaCentral;
                    this.ancho = data.ancho;
                    this.stock = data.stock;
                    this.precio = data.precio
                    this.imagen = data.imagen                    
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
        modificar() {
            let sembradora = {
                modelo:this.modelo,
                lineas:this.lineas,
                cajaCentral:this.cajaCentral,
                ancho: this.ancho,
                stock: this.stock,
                precio: this.precio,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(sembradora),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./sembradoras.html"; // navega a tractores.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
