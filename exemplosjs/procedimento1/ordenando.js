
// Funções do Javascript para ordenações na página HTML

const swap = (vetor, pos1, pos2) => {
    [vetor[pos1], vetor[pos2]] = [vetor[pos2], vetor[pos1]]
}

const shuffle = (vetor, quant) => {
    for (let i = 0; i < quant; i++) {
        const pos1 = Math.floor(Math.random() * vetor.length)
        const pos2 = Math.floor(Math.random() * vetor.length)
        swap(vetor, pos1, pos2)
    }
}

const bubble_sort = vetor => {
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 0; j < vetor.length - i - 1; j++) {
            if (vetor[j] > vetor[j + 1]) {
                swap(vetor, j, j + 1)
            }
        }
    }
}

const selection_sort = vetor => {
    for (let i = 0; i < vetor.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < vetor.length; j++) {
            if (vetor[j] < vetor[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            swap(vetor, i, minIndex)
        }
    }
}

const quick_sort = (vetor, start = 0, end = vetor.length - 1) => {
    if (start == undefined) {
        start = 0
    }
    if (end == undefined) {
        end = vetor.length - 1
    }
    if (start >= end) {
        return
    }
    let pivot_index = particionamento(vetor, start, end)
    quick_sort(vetor, start, pivot_index - 1)
    quick_sort(vetor, pivot_index + 1, end)
}

const particionamento = (vetor, start, end, pivot = vetor[end]) => {
    let i = start
    for (let j = start; j < end; j++) {
        if (vetor[j] < pivot) {
            swap(vetor, i, j)
            i++
        }
    }
    swap(vetor, i, end)
    return i
}


let valores = []
function add() {
    let input = document.getElementById('valor')
    let valor = Number(input.value)
    let lista = document.getElementById('valores')
    let node = document.createElement('li')
    let textNode = document.createTextNode(valor)
    node.appendChild(textNode)
    lista.appendChild(node)
    valores.push(parseInt(valor))
}


function ordenar() {
    const lista = document.getElementById('valores')
    const selects = document.getElementById('selects')
    const vetor = Array.from(lista.children).map(function (item) {
        return parseInt(item.innerHTML)
    })
    const algoritmo = selects.options[selects.selectedIndex].value

    let start = 0;
    let end = vetor.length - 1

    switch (algoritmo) {
        case 'bubble_sort':
            bubble_sort(vetor)
            break;
        case 'selection_sort':
            selection_sort(vetor)
            break;
        case 'quick_sort':
            quick_sort(vetor, start, end)
            break;
    }

    let novos_itens = vetor.map(function (item) {
        return `<li>${item}</li>`
    }).reduce(function (acumulador, item) {
        return acumulador + item
    }, '');
    lista.innerHTML = novos_itens;
}


function misturar() {
    let lista = document.getElementById('valores')
    let array = Array.from(lista.children)
    shuffle(array, array.length)
    for (let i = 0; i < array.length; i++) {
        lista.appendChild(array[i])
    }
}

//Função adicional para limpar os campos dos valores já adicionados

function limpar() {
    let listaValores = document.getElementById('valores');
    listaValores.innerHTML = '';

    let input = document.getElementById('valor');
    input.value = '';
}
