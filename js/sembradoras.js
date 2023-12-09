const { createApp } = Vue


createApp({
    data() {
        return {
            sembradoras:[],
            url:'https://indensigna.pythonanywhere.com/sembradoras',
            error:false,
            cargando:true,   
            id:0,
            modelo:"",
            lineas:"",
            cajaCentral:"",
            ancho:"",
            stock:0,
            precio:0,   
            imagen:"",         
        }        
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.sembradoras = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){       //esta funcion da de alta un nuevo producto/tractor
            let sembradora = {
                modelo:this.modelo,//es lo que como nombre le pongo motor, es un string en la base de dato por lo q no producira error
                lineas:this.lineas,
                cajaCentral:this.cajaCentral,
                ancho: this.ancho,
                stock: this.stock,
                precio: this.precio,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(sembradora),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./sembradoras.html";  // recarga tractores.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },

}).mount('#app')










       
    
    