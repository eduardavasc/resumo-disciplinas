export const criarDisciplina = async (disciplina) => {
    const response = await fetch('http://localhost:3000/disciplinas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(disciplina),
    });

    return response
}

export const recuperarDisciplinas = async () => {
    const response = await fetch('http://localhost:3000/disciplinas');

    const disciplinas = await response.json()
    return disciplinas
}


// chamada ao banco para atualizar disciplina
export const atualizarDisciplina = async (disciplina) => {
    // passado como parametro de roda o id da disciplina 
    const response = await fetch(`http://localhost:3000/disciplinas/${disciplina.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        // o body recebe o objeto de disciplina
        body: JSON.stringify(disciplina),
    });

    return response
}