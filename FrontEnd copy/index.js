var datadb1 = document.querySelectorAll('#data1')
var datadb3 = document.querySelectorAll('#data3')
var datadb4 = document.querySelectorAll('#data4')
const buttonsimu = document.getElementById('simulador')
const tbody = document.getElementById('more-ing')


function agregarIngFor() {
    const labelCant = document.getElementById('Cantidad')
    const labelNom = document.getElementById('nomIngrediente')
    const inputING = document.createElement('input')
    inputING.id='data2'
    inputING.type='text'
    const inputCANT = document.createElement('input')
    inputCANT.id='data2'
    inputCANT.type='number'
    labelCant.appendChild(inputCANT)
    labelNom.appendChild(inputING)
}

// List with info of the formula
function listFor(data) {
    const lista = [];
    var veces = 1;
    var veces1 = (data.length+1)/2
    for (let i = 0; i < (data.length-1)/2 ; i++) {
        const reg = {
            NOMFormula:data[0].value,
            NOMIngrediente:data[veces].value,
            Cantidad:data[veces1].value
        }
        veces = veces + 1;
        veces1 = veces1 + 1;
        lista.push(reg)
    }
    return lista
}
// Send a POST request
let agregarIng = async() => {
    const btnAgrIng = document.getElementById('botonAgreIng')
    btnAgrIng.setAttribute("disabled","")
    btnAgrIng.classList.remove("buttonVerify")
    btnAgrIng.classList.add("boton-locked")
    await axios({
        method: 'post',
        url: "http://localhost:3000/fabricaGalleta/agregarIngrediente",
        data: {
            NOMIngrediente: datadb1[0].value,
        }
    });
    alert("Ingrediente Agregado")
    datadb1[0].value=''
    btnAgrIng.classList.add("buttonVerify")
    btnAgrIng.classList.remove("boton-locked")
    btnAgrIng.removeAttribute("disabled")
}

// Send a POST request
let agregarFor = async() => {
    const datadb2 = document.querySelectorAll('#data2')
    const label1 = document.getElementById('nomIngrediente')
    const label2 = document.getElementById('Cantidad')
    const btnAgrFor = document.getElementById('AgrFor')
    const btnActFor = document.getElementById('ActFor')
    const AgrIng = document.getElementById('AgrIng')
    AgrIng.setAttribute("disabled","")
    AgrIng.classList.remove("buttonVerify")
    AgrIng.classList.add("boton-locked")
    btnAgrFor.setAttribute("disabled","")
    btnAgrFor.classList.remove("buttonVerify")
    btnAgrFor.classList.add("boton-locked")
    btnActFor.setAttribute("disabled","")
    btnActFor.classList.remove("buttonVerify")
    btnActFor.classList.add("boton-locked")
    const listareg = listFor(datadb2);
    await axios({
        method: 'post',
        url: "http://localhost:3000/fabricaGalleta/agregarFormula",
        data: {
            listareg
        }
    });
    alert("Formula Agregada")
    AgrIng.removeAttribute("disabled")
    AgrIng.classList.add("buttonVerify")
    AgrIng.classList.remove("boton-locked")
    btnAgrFor.removeAttribute("disabled")
    btnAgrFor.classList.add("buttonVerify")
    btnAgrFor.classList.remove("boton-locked")
    btnActFor.removeAttribute("disabled")
    btnActFor.classList.add("buttonVerify")
    btnActFor.classList.remove("boton-locked")
    for (let i = 0; i < datadb2.length; i++) {
        datadb2[i].value=''
    }
    while (label1.hasChildNodes()) {
        label1.removeChild(label1.firstChild);
    }
    while (label2.hasChildNodes()) {
        label2.removeChild(label2.firstChild);
    }
    label1.innerHTML='Nombre del ingrediente'
    label2.innerHTML='Cantidad'
    agregarIngFor()
}

// Post request
let agregarIngAlm = async() => {
    const btnAgrIngAlm = document.getElementById('botonAgreIngAlm')
    btnAgrIngAlm.setAttribute("disabled","")
    btnAgrIngAlm.classList.remove("buttonVerify")
    btnAgrIngAlm.classList.add("boton-locked")
    await axios({
        method: 'post',
        url:'http://localhost:3000/fabricaGalleta/agregarINGALM',
        data: {
            NOMIngrediente: datadb3[0].value,
            CantidadAlm: datadb3[1].value
        }
    })
    alert("Ingredientes Agregados al Almacen")
    btnAgrIngAlm.classList.add("buttonVerify")
    btnAgrIngAlm.classList.remove("boton-locked")
    btnAgrIngAlm.removeAttribute("disabled")
    datadb3[0].value = ''
    datadb3[1].value = ''
}


// Send a PUT request
let actualizarFor = async() => {
    let resp
    const btnAgrFor = document.getElementById('AgrFor')
    const btnActFor = document.getElementById('ActFor')
    const AgrIng = document.getElementById('AgrIng')
    const label1 = document.getElementById('nomIngrediente')
    const label2 = document.getElementById('Cantidad')
    AgrIng.setAttribute("disabled","")
    AgrIng.classList.remove("buttonVerify")
    AgrIng.classList.add("boton-locked")
    btnAgrFor.setAttribute("disabled","")
    btnAgrFor.classList.remove("buttonVerify")
    btnAgrFor.classList.add("boton-locked")
    btnActFor.setAttribute("disabled","")
    btnActFor.classList.remove("buttonVerify")
    btnActFor.classList.add("boton-locked")
    const datadb2 = document.querySelectorAll('#data2')
    const listareg = listFor(datadb2);
    await axios({
        method: 'put',
        url: `http://localhost:3000/fabricaGalleta/actualizarFormula/${datadb2[0].value}`,
        data: {
            listareg
        }
    }).then(function(res){
        resp= res.data;
    })
    .catch(function(err){
        console.log(err);
    })
    alert(`${resp.message}`)
    AgrIng.removeAttribute("disabled")
    AgrIng.classList.add("buttonVerify")
    AgrIng.classList.remove("boton-locked")
    btnAgrFor.removeAttribute("disabled")
    btnAgrFor.classList.add("buttonVerify")
    btnAgrFor.classList.remove("boton-locked")
    btnActFor.removeAttribute("disabled")
    btnActFor.classList.add("buttonVerify")
    btnActFor.classList.remove("boton-locked")
    for (let i = 0; i < datadb2.length; i++) {
        datadb2[i].value=''
    }
    while (label1.hasChildNodes()) {
        label1.removeChild(label1.firstChild);
    }
    while (label2.hasChildNodes()) {
        label2.removeChild(label2.firstChild);
    }
    label1.innerHTML='Nombre del ingrediente'
    label2.innerHTML='Cantidad'
    agregarIngFor()
}


// DELETE Formula
let eliminarFor = async() => {
    const btnEliminarFor = document.getElementById('btnEliminarFor')
    btnEliminarFor.setAttribute("disabled","")
    btnEliminarFor.classList.remove("buttonVerify")
    btnEliminarFor.classList.add("boton-locked")
    await axios.delete(`http://localhost:3000/fabricaGalleta/eliminarFormula/${datadb4[0].value}`)
    alert("Formula Eliminada")
    const eliminarcampo = document.getElementById('data4')
    eliminarcampo.value=''
    btnEliminarFor.classList.add("buttonVerify")
    btnEliminarFor.classList.remove("boton-locked")
    btnEliminarFor.removeAttribute("disabled")
    
}

// Verify Formula
let verificarFor = async() => {
    let bool;
    var datadb5 = document.querySelectorAll('#data5')
    await axios({
        method: 'post',
        url: "http://localhost:3000/fabricaGalleta/verFormula",
        data: {
            NOMFormula : datadb5[0].value
        }
    }).then(function(res){
        bool= res.data;
    })
    .catch(function(err){
        console.log(err);
    })
    return bool
}

let simulacion;
// Verificar que alcance
let verificarForIng = async() => {
    buttonsimu.classList.remove('show')
    buttonsimu.classList.add('locked')
    let bool;
    var datadb6 = document.querySelectorAll('#data6')
    const buttonVer = document.getElementById('buttonVer')
    buttonVer.setAttribute("disabled","")
    buttonVer.classList.remove("buttonVerify")
    buttonVer.classList.add("boton-locked")
    await axios({
        method: 'post',
        url: "http://localhost:3000/fabricaGalleta/verIngrediente",
        data: {
            NOMFormula : datadb6[0].value,
            Cantidad : datadb6[1].value
        }
    }).then(function(res){
        simulacion= res.data;
    })
    .catch(function(err){
        console.log(err);
    })
    if(simulacion.resp.check == true){
        alert("Existen suficientes ingredientes. Puede iniciar la sumulación")
        buttonsimu.classList.add('show')
    }else{
        alert(`Ingredientes Insuficientes para realizar ${datadb6[1].value} galletas`)
        buttonVer.classList.add("buttonVerify")
        buttonVer.classList.remove("boton-locked")
    }
}
// simulacion.resp.Tvalvulas,simulacion.resp.Tamasado,simulacion.resp.Thorneado,simulacion.resp.Entrega

let eliminarIng = async() => {
    let bool;
    var datadb6 = document.querySelectorAll('#data6')
    await axios({
        method: 'post',
        url: "http://localhost:3000/fabricaGalleta/eliminarINGALM",
        data: {
            NOMFormula : datadb6[0].value,
            Cantidad : datadb6[1].value
        }
    }).then(function(res){
        bool= res.data;
    })
    .catch(function(err){
        console.log(err);
    })
    return bool
}

function startSim(){
    buttonsimu.setAttribute("disabled","")
    buttonsimu.classList.remove("buttonVerify")
    buttonsimu.classList.add("boton-locked")
    eliminarIng()
    TiempoValv = simulacion.resp.Tvalvulas
    Valves(TiempoValv)
}

function Valves(TiempoValv){
    TiempoValv = TiempoValv * 1000
    const title = document.getElementById('title-simulation')
    const imagen = document.getElementById('video')
    title.innerHTML=`Tiempo de valvulas Aprox ${TiempoValv/1000}s`
    imagen.src = "./assets/Videos galletas/ingredientes.mp4"
    setTimeout(function(){
        title.innerHTML=``
        imagen.src = ""
        TiempoAma = simulacion.resp.Tamasado
        Amasado(TiempoAma)
    },TiempoValv)
}

function Amasado(TiempoAma){
    TiempoAma = TiempoAma * 1000
    const title = document.getElementById('title-simulation')
    const imagen = document.getElementById('video')
    title.innerHTML=`Tiempo de amasado Aprox ${TiempoAma/1000}s`
    imagen.src = "./assets/Videos galletas/amasamiento.mp4"
    setTimeout(function(){
        title.innerHTML=``
        imagen.src = ""
        TiempoHor = simulacion.resp.Thorneado
        Horneado(TiempoHor)
    },TiempoAma)
}

function Horneado(TiempoHor){
    TiempoHor = TiempoHor * 1000
    const title = document.getElementById('title-simulation')
    const imagen = document.getElementById('video')
    title.innerHTML=`Tiempo de horneado Aprox ${TiempoHor/1000}s`
    imagen.src = "./assets/Videos galletas/horneamiento.mp4"
    setTimeout(function(){
        title.innerHTML=``
        imagen.src = ""
        TiempoEnt = simulacion.resp.Entrega
        Entrega(TiempoEnt)
    },TiempoHor)
}

function Entrega(TiempoEnt){
    TiempoEnt = TiempoEnt * 1000
    const title = document.getElementById('title-simulation')
    const imagen = document.getElementById('video')
    title.innerHTML=`Tiempo de entrega Aprox ${TiempoEnt/1000}s`
    imagen.src = "./assets/Videos galletas/empaquetamiento.mp4"
    setTimeout(function(){
        title.innerHTML=``
        imagen.src = ""
        Final()
    },TiempoEnt)
}

function Final(){
    const buttonVer = document.getElementById('buttonVer')
    const title = document.getElementById('title-simulation')
    const imagen = document.getElementById('video')
    title.innerHTML=`Simulación Finalizada`
    imagen.src = ""
    var datadb6 = document.querySelectorAll('#data6')
    datadb6[0].value = ''
    datadb6[1].value = ''
    buttonsimu.classList.add("buttonVerify")
    buttonsimu.classList.remove("boton-locked")
    buttonsimu.removeAttribute("disabled")
    buttonVer.classList.add("buttonVerify")
    buttonVer.classList.remove("boton-locked")
    buttonVer.removeAttribute("disabled")
    buttonsimu.classList.remove('show')
    buttonsimu.classList.add('locked')
}