//----------------------------------------------------///
// 1- paso 
let formulario = document.querySelector('#formulario')
let citas = []
let btnLimpiar = document.getElementById('limpiar')

formulario.addEventListener('submit', e => {
        e.preventDefault()
        capturaDatos()


    })
    // Y en el click, limpiamos
btnLimpiar.addEventListener("click", () => {

    formulario.innerHTML = "";
});


const capturaDatos = () => {

    let nombre = document.getElementById('nombre').value
    let fecha = document.getElementById('fecha').value
    let hora = document.getElementById('hora').value
    let sintomas = document.getElementById('sintomas').value
    validarDatos(nombre, fecha, hora, sintomas)
    let registrarCita = {
        id: Math.round(Math.random() * (100 - 1) + 1),
        nombre,
        fecha,
        hora,
        sintomas

    }

    console.log(registrarCita)

    const key = JSON.parse(localStorage.getItem('Citas'))

    if (key !== null) {
        key.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(key))
    } else {
        citas.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(citas))
    }
    getLocalStorage()


}

function validarDatos(nombre, fecha, hora, sintomas) {
    //validar  nombre
    if (nombre == 0 || nombre == "" || /^\s+$/.test.nombre) {
        alert('Debes escribir tu  nombre');
        return false;
    }
    if (fecha == 0 || fecha == "" || /^\s+$/.test.fecha) {
        alert('Elegi la fecha');
        return false;
    }

    if (hora == 0 || hora == "" || /^\s+$/.test.hora) {
        alert('Escribe  la hora');
        return false;
    }
    //validar  sintoma
    if (sintomas == 0 || sintomas == "" || /^\s+$/.test.sintomas) {
        alert('Debes escribir algun sintoma');
        return false;
    } else {
        alert('gracias por completar tu formulario')
    }
}

// 2 listar

let listarCitas = document.getElementById('listarCita')

const getLocalStorage = () => {
    listarCitas.innerHTML = ''
    let traerCitaLocalStorage = JSON.parse(localStorage.getItem('Citas'))

    traerCitaLocalStorage.map(cita => {
        const { id, nombre, fecha, hora, sintomas } = cita

        listarCitas.innerHTML += `
          <td>${nombre}</td>
          <td>${fecha}</td>
          <td>${hora}</td>
          <td>${sintomas}</td>
          <td><button id=${id} class= "btn btn-danger">Delete</button></td>
        `

    })


}


//3 cargan el dom

document.addEventListener('DOMContentLoaded', getLocalStorage)

//4    al boton de borrar
listarCitas.addEventListener('click', e => {
    console.log(e)

    const btnDelete = e.target.classList.contains('btn-danger')

    const id = e.target.id

    const local = JSON.parse(localStorage.getItem('Citas'))
        // Ana id 3 / yudith  20/ maria 5

    const buscar = local.find(data => data.id === Number(id))

    if (btnDelete) {
        local.forEach((elemet, index) => {
            if (elemet.id === buscar.id) {
                local.splice(index, 1)
                    // ana / maria
                localStorage.setItem('Citas', JSON.stringify(local))
                getLocalStorage()
            }
        })
    }


})


// 5- la busqueda por nombre

let btnBuscar = document.getElementById('btnBuscar')
let buscarNombre = document.getElementById('busqueda')

btnBuscar.addEventListener('click', e => {
    e.preventDefault()

    let input = document.getElementById('inputBuscar').value
    let data = JSON.parse(localStorage.getItem('Citas'))

    let filtro = data.filter(datos => datos.nombre.toLowerCase().includes(input.toLowerCase()))
    console.log(filtro)

    buscarNombre.innerHTML = ''
    filtro.length === 0 ?
        buscarNombre.innerHTML += `<div>El nombre ${input} No existe</div>` :
        filtro.map(cita => {
            const { nombre, fecha, hora, sintomas } = cita

            buscarNombre.innerHTML += `
         <div>
        <div> <h1>${nombre}</h1></div>
         <div>
         <h3>${fecha}</h3>
         <h3>${hora}</h3>
         </div>
         <h3>${sintomas}</h3>
         </div>
         `
        })


})