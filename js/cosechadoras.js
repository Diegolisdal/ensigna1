const { createApp } = Vue


createApp({
    data() {
        return {
            cosechadoras:[],
            url:'https://indensigna.pythonanywhere.com/cosechadoras',
            error:false,
            cargando:true,   
            id:0,
            motor:"",
            modelo:"",
            potencia:"",
            imagen:"",
            stock:0,
            precio:0,            
        }        
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.cosechadoras = data;
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
            let cosechadora = {
                motor:this.motor,//es lo que como nombre le pongo motor, es un string en la base de dato por lo q no producira error
                modelo:this.modelo,
                potencia:this.potencia,
                precio: this.precio,
                stock: this.stock,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(cosechadora),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./cosechadoras.html";  // recarga tractores.html
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










       
    
    